import {NextRequest, NextResponse} from "next/server"
import {getSamlConfig} from "@lib/auth/saml-config"
import {SamlUnavailableError, loadSaml} from "@lib/auth/optional-saml"

/**
 * GET /api/auth/metadata
 *
 * Returns this application's SAML Service Provider metadata as XML.
 * The IdP administrator uses this document to register the SP and establish
 * the trust relationship (entity ID, ACS URL, signing certificate, etc.).
 *
 * @param req - Incoming Next.js request (origin used to build the ACS URL).
 * @returns 200 `application/xml` response with SP metadata,
 *          or a 500 JSON error response if metadata generation fails.
 */
export const GET = async (req: NextRequest) => {
  const samlConfig = await getSamlConfig(req.nextUrl.origin)
  try {
    const signingCert = process.env.SAML_SIGNING_CERT
    if (!signingCert) throw Error("No signing cert available")
    const SAML = await loadSaml()
    const saml = new SAML(samlConfig)

    // Certificates are passed as arguments rather than embedded in the config
    // to avoid issues with passport-saml's metadata generation.
    const metadata = saml
      .generateServiceProviderMetadata(signingCert, signingCert)
      // passport-saml advertises AES-CBC alongside AES-GCM, and the IdP picks from this list. CBC is
      // still accepted at decryption, but only GCM is offered so the IdP moves to it once it re-reads this.
      // @see lib/auth/manual-saml-decrypt.ts
      .replace(/\s*<EncryptionMethod Algorithm="http:\/\/www\.w3\.org\/2001\/04\/xmlenc#aes(128|256)-cbc"\s*\/>/g, "")

    return new Response(metadata, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Disposition": 'inline; filename="metadata.xml"',
      },
    })
  } catch (error) {
    if (error instanceof SamlUnavailableError) {
      console.error(error.message)
      return NextResponse.json({error: "SAML authentication is not enabled on this site"}, {status: 501})
    }

    console.error("❌ Failed to generate SAML metadata:", error)
    return NextResponse.json({error: "Failed to generate metadata"}, {status: 500})
  }
}
