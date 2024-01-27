import {
  ConfigPagesUnion,
  getSdk, MenuAvailable, MenuItem,
  NodeUnion,
  RouteQuery,
  RouteRedirect,
  TermUnion
} from "@lib/gql/__generated__/drupal";
import {GraphQLClient} from "graphql-request";
import type {RequestConfig} from "graphql-request/src/types";
import {getAccessToken} from "@lib/drupal/get-access-token";
import {cache} from "react";

export const graphqlClient = (accessToken?: string, requestConfig: RequestConfig = {}) => {
  const headers: Record<string, string> = {'Content-Type': 'application/json'}
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/graphql',
    {
      headers,
      // Use fetch function so Next.js will be able to cache it normally.
      fetch: async (input: URL | RequestInfo, init?: RequestInit) => fetch(input, init),
      ...requestConfig
    }
  )
  return getSdk(client);
}

export const getEntityFromPath = cache(async <T extends NodeUnion | TermUnion, >(path: string, draftMode: boolean = false): Promise<{
  entity?: T,
  redirect?: RouteRedirect
  error?: string
}> => {
  const token = await getAccessToken(draftMode);
  let entity: T | undefined;

  let query: RouteQuery;
  try {
    query = await graphqlClient(token?.access_token, {next: {tags: [`paths:${path}`]}}).Route({path});
  } catch (e) {
    console.error(`Error fetching route data for '${path}'. ` + (e instanceof Error && e.message));
    return {entity: undefined, redirect: undefined, error: 'unable to fetch'};
  }

  if (query.route?.__typename === 'RouteRedirect') return {redirect: query.route, entity: undefined, error: undefined};
  entity = (query.route?.__typename === 'RouteInternal' && query.route.entity) ? query.route.entity as T : undefined
  return {entity, redirect: undefined, error: undefined};
})

export const getConfigPage = cache(async <T extends ConfigPagesUnion, >(configPageType: ConfigPagesUnion['__typename']): Promise<T | undefined> => {
  try {
    const query = await graphqlClient(undefined, {next: {tags: ['config-pages']}}).ConfigPages();
    if (query.stanfordBasicSiteSettings.nodes[0].__typename === configPageType) return query.stanfordBasicSiteSettings.nodes[0] as T;
    if (query.stanfordGlobalMessages.nodes[0].__typename === configPageType) return query.stanfordGlobalMessages.nodes[0] as T;
    if (query.stanfordLocalFooters.nodes[0].__typename === configPageType) return query.stanfordLocalFooters.nodes[0] as T;
    if (query.stanfordSuperFooters.nodes[0].__typename === configPageType) return query.stanfordSuperFooters.nodes[0] as T;
    if (query.lockupSettings.nodes[0].__typename === configPageType) return query.lockupSettings.nodes[0] as T;
  } catch (e) {
    console.error('Unable to fetch config pages');
  }
})

export const getMenu = cache(async (name?: MenuAvailable): Promise<MenuItem[]> => {
  const menu = await graphqlClient(undefined, {next: {tags: [`menu:${name || "main"}`]}}).Menu({name});
  return (menu.menu?.items || []) as MenuItem[];
})


