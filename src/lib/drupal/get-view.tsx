import {AccessToken, JsonApiWithLocaleOptions} from "next-drupal";
import {buildHeaders, buildUrl} from "./utils";
import {deserialize} from "@lib/drupal/deserialize";

export async function getView<T>(
  name: string,
  options?: { deserialize?: boolean, accessToken?: AccessToken } & JsonApiWithLocaleOptions
): Promise<{
  results: T
  meta: Record<string, any>
  links: { [_key in "next" | "prev" | "self"]?: { href: "string" } }
}> {
  options = {deserialize: true, ...options}

  const [viewId, displayId] = name.split("--")

  const url = buildUrl(`/jsonapi/views/${viewId}/${displayId}`, options.params)

  const response = await fetch(url.toString(), {headers: await buildHeaders(options),})

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  const results = options.deserialize ? deserialize(data) : data

  return {results, meta: data.meta, links: data.links}
}
