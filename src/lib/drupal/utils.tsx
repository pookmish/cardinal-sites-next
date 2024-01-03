import {stringify} from "qs"
import {AccessToken} from "next-drupal";
import {getAccessToken} from "./get-access-token";
import {draftMode} from "next/headers";
import {PageProps} from "@lib/types";

const JSONAPI_PREFIX = process.env.DRUPAL_JSONAPI_PREFIX || "/jsonapi"

/*
 Draft mode works win in normal builds, use environment variable during development.
 */
export const isDraftMode = (): boolean => {
  return process.env.NODE_ENV == 'development' || draftMode().isEnabled;
}

export const buildUrl = (
  path: string,
  params?: string | Record<string, string> | URLSearchParams
): URL => {
  const url = new URL(path.charAt(0) === "/" ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${path}` : path)

  // Use instead URLSearchParams for nested params.
  if (params) url.search = stringify(params)
  return url
}

export const getPathFromContext = (context: PageProps, prefix = ""): string => {
  let {slug} = context.params

  slug = Array.isArray(slug) ? slug.map((s) => encodeURIComponent(s)).join("/") : slug
  return prefix ? `${prefix}/${slug}` : slug
}

export const buildHeaders = async ({accessToken, headers = {"Content-Type": "application/json"}, draftMode = false}: {
  accessToken?: AccessToken
  headers?: HeadersInit
  draftMode?: boolean
} = {}): Promise<Headers> => {
  if (process.env.REQUEST_HEADERS) {
    headers = {...headers, ...JSON.parse(process.env.REQUEST_HEADERS)};
  }

  const requestHeaders = new Headers(headers);

  const token = accessToken || (await getAccessToken(draftMode))
  if (token) requestHeaders.set('Authorization', `Bearer ${token.access_token}`)

  return requestHeaders
}

export const getJsonApiPathForResourceType = async (type: string) => {
  const index = await getJsonApiIndex()
  return index?.links[type]?.href
}

export const getJsonApiIndex = async (
  options?: { accessToken?: AccessToken }
): Promise<{ links: { [type: string]: { href: string } } }> => {
  const url = buildUrl(`${JSONAPI_PREFIX}`)

  // As per https://www.drupal.org/node/2984034 /jsonapi is public.
  // We only call buildHeaders if accessToken is explicitly set.
  // This is for rare cases where /jsonapi might be protected.
  // Cache this response for 1 year since it should almost never change.
  const response = await fetch(url.toString(), {
    next: {revalidate: 31536000},
    headers: options?.accessToken ? await buildHeaders(options) : {"Content-Type": "application/json"},
  })

  if (!response.ok) throw new Error(url.toString() + ': ' + response.statusText)

  return await response.json()
}
