import {getSdk, NodeUnion, RouteQuery, RouteRedirect, TermUnion} from "@lib/gql/__generated__/drupal";
import {GraphQLClient} from "graphql-request";
import type {RequestConfig} from "graphql-request/src/types";
import {getAccessToken} from "@lib/drupal/get-access-token";
import {cache as nodeCache} from "@lib/drupal/get-cache";
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
}> => {
  const cacheKey = path.replace(/^\//, '').replaceAll('/', ':');
  const token = await getAccessToken(draftMode);
  let entity = nodeCache.get<T>(cacheKey);

  if (!entity || token) {
    let query: RouteQuery;
    try {
      query = await graphqlClient(token?.access_token, {next: {tags: [cacheKey]}}).Route({path});
    } catch (e) {
      console.error(`Error fetching route data for '${path}'. ` + (e instanceof Error && e.message));
      return {entity, redirect: undefined};
    }

    if (query.route?.__typename === 'RouteRedirect') return {redirect: query.route, entity};
    entity = (query.route?.__typename === 'RouteInternal' && query.route.entity) ? query.route.entity as T : undefined

    // Just cache the entity for 10 seconds so that any remaining queries during the build process will result in the cached data.
    if (entity) nodeCache.set(cacheKey, entity, 10);
  }

  return {entity, redirect: undefined};
})