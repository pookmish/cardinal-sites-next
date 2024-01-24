import {AccessToken, JsonApiParams, JsonApiResourceWithPath} from "next-drupal";
import {getResourceCollection} from "@lib/drupal/get-resource";
import {PageProps, Params} from "@lib/types";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getPathFromContext} from "@lib/drupal/utils";
import {DrupalRedirect} from "@lib/drupal/drupal-jsonapi.types";
import {cache} from "react";
import {cache as nodeCache} from "@lib/drupal/get-cache";

export const getAllDrupalPaths = cache(async (cacheBust?: boolean): Promise<Map<string, string[]>> => {
  const cachedPaths = nodeCache.get<Map<string, string[]>>('drupal-paths');
  if (cachedPaths) return cachedPaths;

  console.log('fetch all paths');
  const paths = new Map();
  paths.set('node', await getNodePaths(cacheBust))
  paths.set('redirect', await getRedirectPaths(cacheBust))
  nodeCache.set('drupal-paths', paths);
  return paths;
})

const getNodePaths = async (cacheBust?: boolean): Promise<string[]> => {
  const params = new DrupalJsonApiParams();
  const pageLimit = 500;

  // Add a simple include so that it doesn't fetch all the data right now. The full node data comes later, we only need
  // the node paths.
  params.addInclude(['node_type']);
  params.addPageLimit(pageLimit);

  // Append a parameter to bypass any cache between here and the Drupal backend.
  if (cacheBust) params.addCustomParam({'cache1': Math.round(new Date().getTime() / 1000)})

  const contentTypes = [
    'node--stanford_page',
    'node--stanford_event',
    'node--stanford_news',
    'node--stanford_person',
    'node--stanford_policy',
    'node--stanford_publication',
    'node--stanford_course',
  ]

  let paths: PageProps[] = [];

  let fetchMore = true;
  let fetchedData: PageProps[] = []
  let page = 0;
  while (fetchMore) {
    params.addPageOffset(page * pageLimit);

    // Use JSON API to fetch the list of all node paths on the site.
    fetchedData = await getPathsFromContext(contentTypes, {
      params: params.getQueryObject(),
      // We can use no-store here because it's a GET request and will be cached on the CMS.
      cache: 'no-store'
    })
    paths = [...paths, ...fetchedData];
    fetchMore = fetchedData.length > 0;
    page++;
  }
  return paths.map(pagePath => getPathFromContext(pagePath)).filter(path => !!path);
}

const getRedirectPaths = async (cacheBust?: boolean): Promise<string[]> => {
  const params = new DrupalJsonApiParams();
  const pageLimit = 500;
  params.addPageLimit(pageLimit);

  if (cacheBust) params.addCustomParam({'cache1': Math.round(new Date().getTime() / 1000)})

  let redirects: DrupalRedirect[] = []
  let fetchMore = true;
  let fetchedData: DrupalRedirect[] = []
  let page = 0;

  while (fetchMore) {
    params.addPageOffset(page * pageLimit);

    // Use JSON API to fetch the list of all node paths on the site.
    fetchedData = await getResourceCollection<DrupalRedirect>('redirect--redirect', {
      params: params.getQueryObject(),
      // We can use no-store here because it's a GET request and will be cached on the CMS.
      cache: 'no-store'
    })
    redirects = [...redirects, ...fetchedData];

    fetchMore = fetchedData.length === pageLimit;
    page++;
  }
  return redirects.map(redirect => redirect.redirect_source.path)
}

export const getPathsFromContext = async (
  types: string | string[],
  options: {
    params?: JsonApiParams
    accessToken?: AccessToken
    next?: NextFetchRequestConfig
  } & RequestInit = {}
): Promise<PageProps[]> => {
  if (typeof types === "string") types = [types]

  const paths = await Promise.all<{ params: Params }[]>(
    types.map(async (type) => {
      const typeOptions = {...options};

      // Use sparse fieldset to expand max size.
      typeOptions.params = {[`fields[${type}]`]: "path", ...options?.params}

      const resources = await getResourceCollection<JsonApiResourceWithPath>(type, {
        deserialize: true,
        ...typeOptions,
      })

      return buildPathsFromResources(resources)
    })
  )

  return paths.flat()
}

function buildPathsFromResources(resources: JsonApiResourceWithPath[]) {
  return resources?.flatMap((resource): { params: Params } => {
    const slug = resource?.path?.alias

    return {
      params: {slug: slug ? `${slug?.replace(/^\/|\/$/g, "")}`.split("/") : []},
    }
  })
}
