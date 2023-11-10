import {AccessToken, JsonApiWithLocaleOptions, DrupalMenuLinkContent} from "next-drupal";
import {buildUrl, buildHeaders} from "./utils";
import {deserialize} from "@lib/drupal/deserialize";

export async function getMenu(
  name: string,
  options?: {
    deserialize?: boolean
    accessToken?: AccessToken
    draftMode: boolean
  } & JsonApiWithLocaleOptions,
): Promise<{ items: DrupalMenuLinkContent[], tree: DrupalMenuLinkContent[] }> {

  options = {
    deserialize: true,
    draftMode: false,
    ...options,
  }

  const url = buildUrl(`/jsonapi/menu_items/${name}`)

  const response = await fetch(url.toString(), {
    headers: await buildHeaders(options),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  let items: DrupalMenuLinkContent[] = options.deserialize ? deserialize(data) : data;
  items = items.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url,
    parent: item.parent,
    expanded: item.expanded
  } as DrupalMenuLinkContent));
  const {items: tree} = buildMenuTree(items)

  return {
    items,
    tree,
  }
}


function buildMenuTree<T extends DrupalMenuLinkContent>(
  links: DrupalMenuLinkContent[],
  parent: DrupalMenuLinkContent["id"] = ""
): { items: DrupalMenuLinkContent[] } {
  if (!links?.length) {
    return {
      items: [],
    }
  }

  const children = links.filter((link) => link.parent === parent)

  return children.length ? {
    items: children.map((link) => ({
      ...link,
      ...buildMenuTree(links, link.id),
    })),
  } : {items: []}
}
