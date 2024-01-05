import {AccessToken, JsonApiResource, JsonApiOptions} from "next-drupal";
import {buildUrl, buildHeaders, getJsonApiPathForResourceType} from "./utils";
import {deserialize} from "@lib/drupal/deserialize";
import {StanfordConfigPage} from "@lib/drupal/drupal-jsonapi.types";

export const getResourceCollection = async <T extends JsonApiResource, >(
  type: string,
  options?: {
    deserialize?: boolean,
    accessToken?: AccessToken,
    draftMode?: boolean,
    next?: NextFetchRequestConfig
  } & JsonApiOptions,
): Promise<T[]> => {
  options = {deserialize: true, draftMode: false, ...options}

  const apiPath = await getJsonApiPathForResourceType(type)

  if (!apiPath) throw new Error(`Error: resource of type ${type} not found.`)

  const url = buildUrl(apiPath, {...options?.params,})

  const response = await fetch(url.toString(), {next: {...options.next}, headers: await buildHeaders(options)})

  if (!response.ok) throw new Error(response.statusText)

  const json = await response.json()

  return options.deserialize ? deserialize(json) : json
}

export const getConfigPageResource = async <T extends StanfordConfigPage>(
  name: string,
  options?: { deserialize?: boolean, next?: NextFetchRequestConfig } & JsonApiOptions
): Promise<T | undefined> => {

  options = {next: {revalidate: 60 * 60 * 24 * 365}, ...options}

  let response;
  try {
    response = await getResourceCollection(`config_pages--${name}`, options);
    if (response.length === 0) return
  } catch (e) {
    return
  }

  return response.at(0) as T;
}
