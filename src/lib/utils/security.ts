/**
 * Compare two secrets in constant time.
 *
 * A plain `===` bails on the first differing character, which leaks the secret one character at a
 * time to anyone willing to measure the response. Hashing first gives two fixed-length values, so
 * neither the length nor the contents of the expected secret affect how long the comparison takes.
 *
 * @param given - The value supplied by the request.
 * @param expected - The configured secret. An empty or missing secret never matches.
 * @returns Whether the two values are identical.
 */
export const secretsMatch = async (given?: string | null, expected?: string | null): Promise<boolean> => {
  // Fail closed: an unset secret must never turn into an open door.
  if (!expected || typeof given !== "string") return false

  const encoder = new TextEncoder()
  const [givenHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(given)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ])

  const givenBytes = new Uint8Array(givenHash)
  const expectedBytes = new Uint8Array(expectedHash)

  let difference = 0
  for (let i = 0; i < expectedBytes.length; i++) difference |= givenBytes[i] ^ expectedBytes[i]

  return difference === 0
}

/**
 * Reduce a user supplied redirect target to a path on this site.
 *
 * Login and logout accept a destination from the query string or the SAML RelayState, which would
 * otherwise let a crafted link bounce a user to any domain straight after signing in.
 *
 * @param destination - The requested redirect target.
 * @param fallback - Path to use when the destination is missing or points off site.
 * @returns A site-relative path, query and hash.
 */
export const getSafeRedirectPath = (destination: string | null | undefined, fallback = "/"): string => {
  if (!destination || !destination.startsWith("/") || destination.startsWith("//") || destination.includes("\\"))
    return fallback

  const base = "http://localhost"
  try {
    const url = new URL(destination, base)
    if (url.origin !== base) return fallback
    return url.pathname + url.search + url.hash
  } catch {
    return fallback
  }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Check a request supplied value is a UUID before it's used to look up a Drupal entity.
 *
 * Each distinct value is its own Drupal query and cache entry, so malformed ids are rejected up front.
 *
 * @param value - The value supplied by the request.
 * @returns Whether the value is a UUID.
 */
export const isUuid = (value?: string | null): value is string => !!value && UUID_PATTERN.test(value)
