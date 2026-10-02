import {NextRequest, NextResponse} from "next/server"
import {verifyJWT, getJWTCookieName} from "./src/lib/auth/jwt-auth"
import {secretsMatch} from "./src/lib/utils/security"

// Draft content must never be indexed or held in a shared cache, and the preview url carries the
// shared secret in its query string, so keep that url out of any outbound Referer header.
const PREVIEW_HEADERS: Record<string, string> = {
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "no-store, max-age=0",
}

export const proxy = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith("/preview")) return handlePreview(request)

  // Check for cache-clear specific route
  if (pathname.startsWith("/system")) {
    if (await isAuthenticated(request)) return

    return new NextResponse("Authentication required", {
      status: 401,
      headers: {"WWW-Authenticate": "Basic"},
    })
  }

  const loginUrl = new URL("/api/auth/login", request.url)
  loginUrl.searchParams.set("destination", pathname)

  // Get JWT token from cookies
  const token = request.cookies.get(getJWTCookieName())?.value
  if (!token) return NextResponse.redirect(loginUrl)

  // Verify JWT token
  const payload = await verifyJWT(token)
  if (!payload) return NextResponse.redirect(loginUrl)

  // Add user info to request headers for use in pages/components. These overwrite any `x-user-*`
  // headers the client sent, so pages can trust them.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-user-id", payload.uid || "")
  requestHeaders.set("x-user-email", payload.mail || "")
  requestHeaders.set("x-user-name", payload.displayName || "")

  return NextResponse.next({request: {headers: requestHeaders}})
}

/**
 * Gate the editor preview routes on the secret shared with Drupal.
 *
 * Every response here is a dead end for crawlers and caches, and an unauthorized request is
 * rewritten to the 404 page rather than redirected so it is indistinguishable from a missing page.
 */
const handlePreview = async (request: NextRequest) => {
  const notFound = () => withPreviewHeaders(NextResponse.rewrite(new URL("/404", request.url)))

  // Fail closed. Without a configured secret there is nothing to authorize against, so an empty
  // environment variable must never turn into an open door to unpublished content.
  const expectedSecret = process.env.DRUPAL_PREVIEW_SECRET
  if (!expectedSecret) {
    console.error("DRUPAL_PREVIEW_SECRET is not set. Preview routes are disabled.")
    return notFound()
  }

  const secret = request.nextUrl.searchParams.get("secret")
  if (!secret || !(await secretsMatch(secret, expectedSecret))) return notFound()

  if (request.nextUrl.pathname === "/preview") {
    const slug = request.nextUrl.searchParams.get("slug")
    if (!isSafePreviewSlug(slug)) return notFound()

    const destination = new URL(`/preview${slug}`, request.url)
    // Set the parameter rather than interpolating it so the secret is always escaped.
    destination.searchParams.set("secret", secret)
    return withPreviewHeaders(NextResponse.redirect(destination))
  }

  return withPreviewHeaders(NextResponse.next())
}

const withPreviewHeaders = (response: NextResponse) => {
  Object.entries(PREVIEW_HEADERS).forEach(([header, value]) => response.headers.set(header, value))
  return response
}

/**
 * Drupal sends the page to preview as a `slug` query parameter, which is pasted straight into the
 * redirect location. Accept only a plain, relative path: an authority (`//host`), a backslash (which
 * some browsers normalize to `/`), or a `..` segment would all walk the editor off `/preview` — and
 * carry the secret along in the query string. The decoded form is checked too, so a `%2e%2e` or
 * `%5c` cannot smuggle the same characters past these checks.
 */
const isSafePreviewSlug = (slug: string | null): slug is string => {
  if (!slug) return false

  let decoded: string
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    // Malformed percent encoding.
    return false
  }

  return [slug, decoded].every(
    value =>
      value.startsWith("/") &&
      !value.startsWith("//") &&
      !value.includes("\\") &&
      !value.includes("?") &&
      !value.includes("#") &&
      !value.split("/").includes("..")
  )
}

const isAuthenticated = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")

  const [scheme, encoded] = authHeader?.split(" ") || []
  if (scheme?.toLowerCase() !== "basic" || !encoded) return false

  // Check for cache-clear specific route
  if (req.nextUrl.pathname.startsWith("/system/cache-clear")) {
    // Split on the first colon only; the password itself may contain colons.
    const credentials = Buffer.from(encoded, "base64").toString()
    const separator = credentials.indexOf(":")
    if (separator < 0) return false

    return await checkCacheClearAuth(credentials.slice(0, separator), credentials.slice(separator + 1))
  }
  return false
}

const checkCacheClearAuth = async (username: string, password: string): Promise<boolean> => {
  const validUsername = process.env.CACHE_CLEAR_USERNAME
  const validPassword = process.env.CACHE_CLEAR_PASSWORD

  if (!validUsername || !validPassword) {
    console.error("CACHE_CLEAR_USERNAME or CACHE_CLEAR_PASSWORD not set")
    return false
  }

  const [usernameOk, passwordOk] = await Promise.all([
    secretsMatch(username, validUsername),
    secretsMatch(password, validPassword),
  ])
  return usernameOk && passwordOk
}

// Change the matcher to desired url patterns.
// If this is changed, the directory /app/internal may need to be renamed,
// or removed if the whole site is behind authentication.
export const config = {
  matcher: [
    "/preview/:path*",
    "/system/:path*",
    // Comment or remove these if the site does not have authentication.
    "/internal/:path*",
    "/user",
  ],
}
