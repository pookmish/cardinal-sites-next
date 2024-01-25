import {AccessToken, JsonApiResource, JsonApiOptions} from "next-drupal";
import {buildUrl, buildHeaders, getJsonApiPathForResourceType} from "./utils";
import {deserialize} from "@lib/drupal/deserialize";
import {StanfordConfigPage} from "@lib/drupal/drupal-jsonapi.types";
import {cache} from "react";

export const getResourceCollection = async <T extends JsonApiResource, >(
  type: string,
  options?: {
    deserialize?: boolean,
    accessToken?: AccessToken,
    draftMode?: boolean,
    next?: NextFetchRequestConfig
  } & JsonApiOptions & RequestInit,
): Promise<T[]> => {
  options = {deserialize: true, draftMode: false, ...options}

  const apiPath = await getJsonApiPathForResourceType(type)

  if (!apiPath) throw new Error(`Error: resource of type ${type} not found.`)

  const url = buildUrl(apiPath, {...options?.params,})

  const response = await fetch(url.toString(), {...options, headers: await buildHeaders(options)})

  if (!response.ok) throw new Error(response.statusText)

  const json = await response.json()

  return options.deserialize ? deserialize(json) : json
}

export const getConfigPageResource = cache(async <T extends StanfordConfigPage>(
  name: string,
  options?: {
    deserialize?: boolean
    next?: NextFetchRequestConfig
  } & JsonApiOptions & RequestInit
): Promise<T | undefined> => {

  options = {next: {tags: [`config-page:${name}`]}, ...options}

  let response;
  try {
    response = await getResourceCollection(`config_pages--${name}`, options);
    if (response.length === 0) return
  } catch (e) {
    return
  }

  return response.at(0) as T;
})
