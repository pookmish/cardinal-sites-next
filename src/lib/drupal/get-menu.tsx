import {AccessToken, JsonApiWithLocaleOptions, DrupalMenuLinkContent} from "next-drupal";
import {buildUrl, buildHeaders} from "./utils";
import {deserialize} from "@lib/drupal/deserialize";

export type DrupalMenuItem ={
  id: string,
  title: string,
  url: string
  parent?: string
  expanded: boolean
  items?: DrupalMenuItem[]
  enabled: boolean
}

export const getMenu = async (
  name: string,
  options?: {
    deserialize?: boolean
    accessToken?: AccessToken
    draftMode: boolean
  } & JsonApiWithLocaleOptions,
): Promise<{ items: DrupalMenuItem[], tree: DrupalMenuItem[] }> => {

  options = {deserialize: true, draftMode: false, ...options}

  // No need to use GraphQL here.
  const url = buildUrl(`/jsonapi/menu_items/${name}`)

  const response = await fetch(url.toString(), {next: {revalidate: 3600}, headers: await buildHeaders(options),})

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  let items: DrupalMenuLinkContent[] | DrupalMenuItem[] = options.deserialize ? deserialize(data) : data;
  items = items.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url,
    parent: item.parent,
    expanded: item.expanded,
    enabled: item.enabled
  }));

  const {items: tree} = buildMenuTree(items)
  return {items, tree}
}


const buildMenuTree = (
  links: DrupalMenuItem[],
  parent: DrupalMenuItem["id"] = ""
): { items: DrupalMenuItem[] } => {

  if (!links?.length) return {items: []}

  const children = links.filter((link) => link.parent === parent)

  return children.length ?
    {items: children.map((link) => ({...link, ...buildMenuTree(links, link.id)}))}
    : {items: []}
}