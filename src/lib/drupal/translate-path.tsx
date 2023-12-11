import {AccessToken, DrupalTranslatedPath} from "next-drupal";
import {buildHeaders, buildUrl, getPathFromContext} from "./utils";
import {PageProps} from "@lib/types";


export const translatePath = async (
  path: string,
  options?: { accessToken?: AccessToken }
): Promise<DrupalTranslatedPath | null> => {
  const url = buildUrl("/router/translate-path", {path})

  const response = await fetch(url.toString(), {headers: await buildHeaders(options)})

  if (!response.ok) return null
  return await response.json()
}

export const translatePathFromContext = async (
  context: PageProps,
  options?: { accessToken?: AccessToken, prefix?: string }
): Promise<DrupalTranslatedPath | null> => {
  options = {prefix: "", ...options}
  const path = getPathFromContext(context, options.prefix)

  return await translatePath(path, {accessToken: options.accessToken})
}
