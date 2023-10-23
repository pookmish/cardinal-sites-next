// @ts-nocheck

import {AccessToken, DrupalMenuLinkContent, JsonApiWithLocaleOptions} from "next-drupal/src/types";
import {buildUrl, buildHeaders} from "./utils";
import {deserialize} from "@lib/drupal/deserialize";

export async function getMenu<T extends DrupalMenuLinkContent>(
  name: string,
  options?: {
    deserialize?: boolean
    accessToken?: AccessToken
  } & JsonApiWithLocaleOptions,
  draftMode: boolean = false
): Promise<{
  items: T[]
  tree: T[]
}> {
  options = {
    deserialize: true,
    ...options,
  }

  const localePrefix =
    options?.locale && options.locale !== options.defaultLocale
      ? `/${options.locale}`
      : ""

  const url = buildUrl(`${localePrefix}/jsonapi/menu_items/${name}`)

  const response = await fetch(url.toString(), {
    headers: await buildHeaders(options, draftMode),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  let items = options.deserialize ? deserialize(data) : data
  items = items.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url,
    parent: item.parent,
    expanded: item.expanded
  }));
  const {items: tree} = buildMenuTree(items)

  return {
    items,
    tree,
  }
}


function buildMenuTree(
  links: DrupalMenuLinkContent[],
  parent: DrupalMenuLinkContent["id"] = ""
) {
  if (!links?.length) {
    return {
      items: [],
    }
  }

  const children = links.filter((link) => link.parent === parent)

  return children.length
    ? {
      items: children.map((link) => ({
        ...link,
        ...buildMenuTree(links, link.id),
      })),
    }
    : {}
}
