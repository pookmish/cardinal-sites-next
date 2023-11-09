// @ts-nocheck

import {AccessToken, JsonApiResource, JsonApiWithLocaleOptions} from "next-drupal/src/types";
import {stringify} from "qs"
import {buildUrl, buildHeaders, getJsonApiPathForResourceType, getPathFromContext} from "./utils";
import {deserialize} from "@lib/drupal/deserialize";
import {JsonApiParams} from "next-drupal";
import {PageProps, StanfordConfigPage} from "@lib/types";

export async function getResources<T>(items: { type: string, id: string }[], draftDev: boolean = false): Promise<T[]> {
  const requests: PromiseLike<any>[] = [];
  items.map(item => requests.push(getResource(item.type, item.id, {}, draftDev)));
  // @ts-ignore
  return Promise.all(requests.map((p, i) => p.catch((e) => {
    console.error(`Failed Fetching (probably unpublished) component ${items[i].type}-${items[i].id}`, e);
    return null
  })));
}

export async function getResourceFromContext<T extends JsonApiResource>(
  type: string,
  context: PageProps,
  options?: {
    prefix?: string
    deserialize?: boolean
    params?: JsonApiParams
    accessToken?: AccessToken
    isVersionable?: boolean
  },
  draftMode: boolean = false
): Promise<T | undefined> {
  options = {
    deserialize: true,
    // Add support for revisions for node by default.
    // TODO: Make this required before stable?
    isVersionable: /^node--/.test(type),
    ...options,
  }

  const path = getPathFromContext(context, options?.prefix)

  const resource = await getResourceByPath<T>(path, {
    deserialize: options.deserialize,
    isVersionable: options.isVersionable,
    params: {
      ...options?.params,
    },
  }, draftMode)

  return resource
}

export async function getResourceByPath<T extends JsonApiResource>(
  path: string,
  options?: {
    accessToken?: AccessToken
    deserialize?: boolean
    isVersionable?: boolean
  } & JsonApiWithLocaleOptions,
  draftMode: boolean = false
): Promise<T | undefined> {
  options = {
    deserialize: true,
    isVersionable: false,
    params: {},
    ...options,
  }

  if (!path) {
    return
  }

  const {resourceVersion = "rel:latest-version", ...params} = options.params

  const resourceParams = stringify(params)

  const payload = [
    {
      requestId: "router",
      action: "view",
      uri: `/router/translate-path?path=${path}&_format=json`,
      headers: {Accept: "application/vnd.api+json"},
    },
    {
      requestId: "resolvedResource",
      action: "view",
      uri: `{{router.body@$.jsonapi.individual}}?${resourceParams.toString()}`,
      waitFor: ["router"],
    },
  ]

  const url = buildUrl("/subrequests", {_format: "json"})

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: await buildHeaders(options, draftMode),
    redirect: "follow",
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const json = await response.json()

  if (!json["resolvedResource#uri{0}"]) {
    return
  }

  const data = JSON.parse(json["resolvedResource#uri{0}"]?.body)

  if (data.errors) {
    throw new Error(data.errors[0].detail)
  }

  return options.deserialize ? deserialize(data) : data
}

export async function getResourceCollection<T = JsonApiResource[]>(
  type: string,
  options?: {
    deserialize?: boolean
    accessToken?: AccessToken
  } & JsonApiWithLocaleOptions,
  draftMode: boolean = false
): Promise<T> {
  options = {
    deserialize: true,
    ...options,
  }

  const apiPath = await getJsonApiPathForResourceType(type)

  if (!apiPath) {
    throw new Error(`Error: resource of type ${type} not found.`)
  }

  const url = buildUrl(apiPath, {
    ...options?.params,
  })

  const response = await fetch(url.toString(), {
    headers: await buildHeaders(options, draftMode),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()

  return options.deserialize ? deserialize(json) : json
}

export async function getResource<T extends JsonApiResource>(
  type: string,
  uuid: string,
  options?: {
    accessToken?: AccessToken
    deserialize?: boolean
  } & JsonApiWithLocaleOptions,
  draftMode: boolean = false
): Promise<T> {
  options = {
    deserialize: true,
    params: {},
    ...options,
  }

  const apiPath = await getJsonApiPathForResourceType(type)

  if (!apiPath) {
    throw new Error(`Error: resource of type ${type} not found.`)
  }

  const url = buildUrl(`${apiPath}/${uuid}`, {
    ...options?.params,
  })

  const response = await fetch(url.toString(), {
    headers: await buildHeaders(options, draftMode),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()
  return options.deserialize ? deserialize(json) : json
}

export async function getConfigPageResource<T extends StanfordConfigPage>(
  name: string,
  options?: {
    deserialize?: boolean
    accessToken?: AccessToken
  } & JsonApiWithLocaleOptions): Promise<T | undefined> {
  let response;
  try {
    response = await getResourceCollection<JsonApiResource>(`config_pages--${name}`, options);
    if (response.length === 0) {
      return;
    }
  } catch (e) {
    return;
  }

  return response.at(0);
}