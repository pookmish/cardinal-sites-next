import type {SamlConfig} from "passport-saml"

/**
 * Normalize the IdP certificate setting into the bare base64 bodies passport-saml expects.
 *
 * passport-saml only copes with raw base64 or a cleanly line-wrapped PEM, but the value often arrives
 * with literal `\n` escapes (Vault, Vercel) or with odd wrapping. Any of those makes every signature
 * check fail. More than one PEM block may be given, for example during an IdP certificate rollover.
 *
 * @param value - The `SAML_IDP_CERT` value.
 * @returns One base64 certificate body per certificate, or undefined when none is configured.
 */
export const parseCertificates = (value?: string): string[] | undefined => {
  if (!value) return
  const certs = value
    .replace(/\\r|\\n/g, "\n")
    .split(/-----END CERTIFICATE-----/)
    .map(cert => cert.replace(/-----BEGIN CERTIFICATE-----/, "").replace(/[^A-Za-z0-9+/=]/g, ""))
    .filter(cert => !!cert)
  return certs.length ? certs : undefined
}

export const getSamlConfig = async (origin: string): Promise<SamlConfig> => {
  try {
    return {
      entryPoint: process.env.SAML_ENTRY_POINT,
      issuer: process.env.SAML_ENTITY_ID,
      // Reject assertions the IdP issued for a different service provider.
      audience: process.env.SAML_ENTITY_ID,
      cert: parseCertificates(process.env.SAML_IDP_CERT),
      privateKey: process.env.SAML_PRIVATE_KEY,
      decryptionPvk: process.env.SAML_PRIVATE_KEY,
      signatureAlgorithm: "sha256" as const,
      digestAlgorithm: "sha256" as const,
      identifierFormat: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
      callbackUrl: `${origin}/api/auth/callback`,
    } as SamlConfig
  } catch (error) {
    console.error("Failed to initialize SAML config with Vault certificates:", error)
    throw error
  }
}
