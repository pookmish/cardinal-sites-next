import {cache} from "./get-cache"

interface AccessToken {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token?: string
}

const CACHE_KEY = "NEXT_DRUPAL_ACCESS_TOKEN"

export const getAccessToken = async (draftMode: boolean = false): Promise<AccessToken | undefined> => {

  if (!process.env.DRUPAL_DRAFT_CLIENT || !process.env.DRUPAL_DRAFT_SECRET || !draftMode) return;

  const cached = cache.get<AccessToken>(CACHE_KEY)
  if (cached?.access_token) return cached

  const basic = Buffer.from(`${process.env.DRUPAL_DRAFT_CLIENT}:${process.env.DRUPAL_DRAFT_SECRET}`)
    .toString("base64")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
    {
      method: "POST",
      next: {revalidate: 299},
      headers: {Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded"},
      body: `grant_type=client_credentials`,
    }
  )

  if (!response.ok) {
    cache.set(CACHE_KEY, null, 299)
    return;
  }

  const result: AccessToken = await response.json()

  cache.set(CACHE_KEY, result, result.expires_in)

  return result
}
