import {getSdk, NodeUnion, RouteQuery, RouteRedirect, TermUnion} from "@lib/gql/__generated__/drupal";
import {GraphQLClient} from "graphql-request";
import type {RequestConfig} from "graphql-request/src/types";
import {getAccessToken} from "@lib/drupal/get-access-token";
import {cache} from "@lib/drupal/get-cache";

export const graphqlClient = (accessToken?: string, requestConfig: RequestConfig = {}) => {
  requestConfig = {
    next: {revalidate: 60 * 60 * 24 * 365},
    ...requestConfig
  }
  const headers: Record<string, string> = {'Content-Type': 'application/json'}
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/graphql',
    {headers, ...requestConfig}
  )
  return getSdk(client);
}

export const getEntityFromPath = async <T extends NodeUnion | TermUnion, >(path: string, draftMode: boolean = false): Promise<{entity?: T, redirect?: RouteRedirect} | undefined> => {
  const cacheKey = path.replaceAll('/', '--');
  const token = await getAccessToken(draftMode);
  let entity = cache.get<T>(cacheKey);

  if (!entity || token) {
    let query: RouteQuery;
    try {
      query = await graphqlClient(token?.access_token).Route({path});
    } catch (e) {
      console.error(`Error fetching route data for '${path}'. ` + (e instanceof Error && e.message));
      return;
    }

    if (query.route?.__typename === 'RouteRedirect') return {redirect: query.route, entity};
    entity = (query.route?.__typename === 'RouteInternal' && query.route.entity) ? query.route.entity as T : undefined

    // Just cache the entity for 30 seconds so that any remaining queries during the build process will result in the cached data.
    if (entity) cache.set(cacheKey, entity, 30);
  }

  return {entity, redirect: undefined};
}