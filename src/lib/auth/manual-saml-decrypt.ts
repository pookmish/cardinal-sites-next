// Manual SAML decryption utility to work around passport-saml encrypted assertion issues
// <reference path="../../@types/xml-encryption/index.d.ts" />
import type {SamlConfig} from "passport-saml"
import {createHash} from "crypto"
import {UserProfile} from "@lib/auth/jwt-auth"
import {SamlUnavailableError, loadDomParser, loadSaml, loadSamlXml, loadXmlEncryption} from "@lib/auth/optional-saml"

/** `passport-saml` keeps its assertion checks private in its types, but they are what we need to reuse. */
type SamlWithAssertionChecks = {
  processValidlySignedAssertionAsync: (
    assertionXml: string,
    samlResponseXml: string,
    inResponseTo?: string | null
  ) => Promise<unknown>
}

/**
 * Validate a SAML response from the IdP and return the trusted assertion XML.
 *
 * This mirrors `passport-saml`'s `validatePostResponseAsync`, swapping in our own decryption (see
 * `manuallyDecryptSAMLResponse`). Nothing in the response may be trusted until this passes: without
 * it, anyone can post a hand-written, unsigned assertion and be issued a session for any user.
 *
 * - The response, or the single assertion it carries, must be signed by the IdP certificate.
 * - Exactly one assertion is accepted, to rule out signature wrapping across multiple assertions.
 * - The assertion's time conditions, subject confirmation and audience are checked by `passport-saml`.
 *
 * @param encodedResponse - The base64 `SAMLResponse` posted by the IdP.
 * @param samlConfig - The SP configuration, including the IdP certificate and decryption key.
 * @returns The serialized, signature-verified `Assertion` element.
 * @throws {Error} When the response is malformed, unsigned, or fails any assertion check.
 */
export const validateSamlResponse = async (encodedResponse: string, samlConfig: SamlConfig): Promise<string> => {
  const SAML = await loadSaml()
  const {parseDomFromString, xpath} = await loadSamlXml()
  const saml = new SAML(samlConfig)

  if (typeof samlConfig.cert === "function") throw new Error("Certificate callbacks are not supported")
  const certs = [samlConfig.cert].flat().filter(cert => !!cert)
  if (!certs.length) throw new Error("No IdP certificate configured")

  const xml = Buffer.from(encodedResponse, "base64").toString("utf8")
  const doc = parseDomFromString(xml)
  if (!doc?.documentElement) throw new Error("SAMLResponse is not valid base64-encoded XML")

  const inResponseTo = xpath.selectAttributes(doc, "/*[local-name()='Response']/@InResponseTo")[0]?.nodeValue

  // A top level signature only counts when it covers the single root element of the document.
  const responseSigned =
    saml.validateSignature(xml, doc.documentElement, certs) &&
    Array.from(doc.childNodes).filter(node => node.nodeType === node.ELEMENT_NODE).length === 1

  const assertions = xpath.selectElements(doc, "/*[local-name()='Response']/*[local-name()='Assertion']")
  const encryptedAssertions = xpath.selectElements(
    doc,
    "/*[local-name()='Response']/*[local-name()='EncryptedAssertion']"
  )
  if (assertions.length + encryptedAssertions.length !== 1) throw new Error("Expected exactly one SAML assertion")

  let assertionXml: string
  if (encryptedAssertions.length) {
    const decryptedXml = await manuallyDecryptSAMLResponse(
      encryptedAssertions[0].toString(),
      samlConfig.decryptionPvk as string
    )
    if (!decryptedXml) throw new Error("Failed to decrypt SAML assertion")

    const decryptedAssertions = xpath.selectElements(parseDomFromString(decryptedXml), "/*[local-name()='Assertion']")
    if (decryptedAssertions.length !== 1) throw new Error("Invalid EncryptedAssertion content")

    if (!responseSigned && !saml.validateSignature(decryptedXml, decryptedAssertions[0], certs))
      throw new Error(
        `Invalid signature on encrypted SAML assertion. ${diagnoseSignatures(doc, decryptedAssertions[0], certs)}`
      )

    assertionXml = decryptedAssertions[0].toString()
  } else {
    if (!responseSigned && !saml.validateSignature(xml, assertions[0], certs))
      throw new Error(`Invalid signature on SAML assertion. ${diagnoseSignatures(doc, assertions[0], certs)}`)

    assertionXml = assertions[0].toString()
  }

  // Throws on expired or not-yet-valid assertions and on an audience mismatch.
  await (saml as unknown as SamlWithAssertionChecks).processValidlySignedAssertionAsync(assertionXml, xml, inResponseTo)

  return assertionXml
}

/**
 * Explain why the signatures in a rejected response didn't verify.
 *
 * Returns a short verdict for the error message, so the cause survives log viewers that truncate long
 * lines, and logs the details (algorithms, references and certificate fingerprints) on separate lines.
 * Certificates are public, so their fingerprints are safe to log.
 */
const diagnoseSignatures = (responseDoc: Document, assertion: Element, certs: string[]): string => {
  const DSIG = "http://www.w3.org/2000/09/xmldsig#"
  const fingerprint = (cert: string) =>
    createHash("sha256")
      .update(Buffer.from(cert.replace(/-----[^-]+-----|\s/g, ""), "base64"))
      .digest("hex")
      .toUpperCase()
      .replace(/(..)(?!$)/g, "$1:")
  const configured = certs.map(fingerprint)

  // Only signatures that are direct children of the element sign that element.
  const signatures = [responseDoc.documentElement, assertion].flatMap(element =>
    (Array.from(element.childNodes) as Element[])
      .filter(node => node.localName === "Signature" && node.namespaceURI === DSIG)
      .map(signature => ({
        signs: element === assertion ? "assertion" : "response",
        elementId: element.getAttribute("ID"),
        reference: signature.getElementsByTagNameNS(DSIG, "Reference")[0]?.getAttribute("URI"),
        algorithm: signature.getElementsByTagNameNS(DSIG, "SignatureMethod")[0]?.getAttribute("Algorithm"),
        certs: Array.from(signature.getElementsByTagNameNS(DSIG, "X509Certificate")).map(cert =>
          fingerprint(cert.textContent || "")
        ),
      }))
  )

  console.error(`SAML signature check: configured SAML_IDP_CERT sha256 ${configured.join(", ")}`)
  signatures.forEach(signature =>
    console.error(
      `SAML signature check: ${signature.signs} ID "${signature.elementId}", reference "${signature.reference}",`,
      `algorithm ${signature.algorithm}, signed with certificate sha256 ${signature.certs.join(", ") || "not included"}`
    )
  )

  if (!signatures.length) return "The IdP did not sign the response or the assertion."
  if (signatures.some(signature => signature.reference !== `#${signature.elementId}`))
    return "The signature reference does not point at the signed element's ID."
  const signingCerts = signatures.flatMap(signature => signature.certs)
  if (signingCerts.length && !signingCerts.some(cert => configured.includes(cert)))
    return "CERTIFICATE MISMATCH: the IdP signed with a certificate that is not in SAML_IDP_CERT."
  if (signingCerts.length) return "The certificate matches SAML_IDP_CERT, but the signature value does not verify."
  return "The signature does not verify against SAML_IDP_CERT."
}

/**
 * Encryption algorithms refused outright. xml-encryption's own `disallowDecryptionWithInsecureAlgorithm`
 * also blocks AES-CBC, which the IdP uses, so the check is done here instead.
 *
 * - RSA PKCS#1 v1.5 key transport is open to Bleichenbacher style padding oracle attacks.
 * - Triple DES is deprecated by NIST.
 *
 * AES-CBC is accepted. It is also open to padding oracle attacks, which the callback blunts by failing
 * every bad response the same way, and the SP metadata asks the IdP for AES-GCM instead.
 */
const BLOCKED_ENCRYPTION_ALGORITHMS = [
  "http://www.w3.org/2001/04/xmlenc#rsa-1_5",
  "http://www.w3.org/2001/04/xmlenc#tripledes-cbc",
]

/**
 * Decrypt an `EncryptedAssertion` with the SP private key.
 *
 * Only call this through `validateSamlResponse`; decrypted content is not authenticated on its own.
 *
 * @param encryptedXml - XML containing the `EncryptedData` to decrypt.
 * @param privateKeyPem - The SP private key.
 * @returns The decrypted XML, or null when decryption fails.
 */
export const manuallyDecryptSAMLResponse = async (
  encryptedXml: string,
  privateKeyPem: string
): Promise<string | null> => {
  try {
    const xmlenc = await loadXmlEncryption()
    const DOMParser = await loadDomParser()

    // Check every EncryptionMethod, covering both the content and the key transport algorithm.
    const encryptionMethods = new DOMParser()
      .parseFromString(encryptedXml, "text/xml")
      .getElementsByTagNameNS("http://www.w3.org/2001/04/xmlenc#", "EncryptionMethod")
    for (let i = 0; i < encryptionMethods.length; i++) {
      const algorithm = encryptionMethods[i].getAttribute("Algorithm")
      if (!algorithm || BLOCKED_ENCRYPTION_ALGORITHMS.includes(algorithm)) {
        console.error("❌ Manual decryption failed: encryption algorithm", algorithm, "is not allowed")
        return null
      }
    }

    // Try to decrypt using xml-encryption directly. Awaited so a synchronous throw is caught below.
    return await new Promise((resolve, _reject) => {
      const decryptOptions = {
        key: privateKeyPem,
        // Algorithms are checked against BLOCKED_ENCRYPTION_ALGORITHMS above, which allows AES-CBC.
        disallowDecryptionWithInsecureAlgorithm: false,
        // The AES-CBC warning would fire on every login for a known, accepted configuration.
        warnInsecureAlgorithm: false,
      }

      xmlenc.decrypt(encryptedXml, decryptOptions, (err: Error | null, result?: string) => {
        if (err) {
          console.error("❌ Manual decryption failed:", err.message)
          resolve(null)
        } else {
          resolve(result || null)
        }
      })
    })
  } catch (error) {
    if (error instanceof SamlUnavailableError) throw error
    console.error("❌ Manual decryption error:", error instanceof Error ? error.message : error)
    return null
  }
}

/**
 * Read the user profile from an assertion returned by `validateSamlResponse`.
 *
 * @param assertionXml - A signature-verified `Assertion` element.
 * @returns The user profile, or null when the XML cannot be read.
 */
export const extractProfileFromDecryptedXML = async (assertionXml: string): Promise<UserProfile | null> => {
  try {
    const DOMParser = await loadDomParser()
    const parser = new DOMParser()
    const doc = parser.parseFromString(assertionXml, "text/xml")

    // Get attributes
    const attributes = doc.getElementsByTagNameNS("urn:oasis:names:tc:SAML:2.0:assertion", "Attribute")
    const profileAttributes: Map<string, string[]> = new Map([])

    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i]
      const name = attr.getAttribute("FriendlyName") || attr.getAttribute("Name")
      const values = attr.getElementsByTagNameNS("urn:oasis:names:tc:SAML:2.0:assertion", "AttributeValue")

      if (!name || values.length === 0) continue

      const attributeValues: string[] = []

      for (let j = 0; j < values.length; j++) {
        const textContent = values[j]?.textContent
        if (textContent !== null && textContent !== undefined) {
          attributeValues.push(textContent)
        }
      }
      if (attributeValues.length > 0) {
        profileAttributes.set(name, attributeValues)
      }
    }

    // Extract basic profile information
    return {
      uid: profileAttributes.get("uid")?.[0] || "",
      mail: profileAttributes.get("mail")?.[0] || "",
      eduPersonPrincipalName: profileAttributes.get("eduPersonPrincipalName")?.[0] || "",
      displayName: profileAttributes.get("displayName")?.[0] || "",
      eduPersonAffiliation: profileAttributes.get("eduPersonAffiliation"),
    }
  } catch (error) {
    if (error instanceof SamlUnavailableError) throw error
    if (error instanceof Error) {
      console.error("❌ Profile extraction error:", error.message)
    }
    return null
  }
}
