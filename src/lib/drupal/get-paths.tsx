import {AccessToken, JsonApiParams, JsonApiResourceWithPath} from "next-drupal";
import {getResourceCollection} from "@lib/drupal/get-resource";
import {PageProps, Params} from "@lib/types";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getPathFromContext} from "@lib/drupal/utils";
import {DrupalRedirect} from "@lib/drupal/drupal-jsonapi.types";
import {cache as nodeCache} from "@lib/drupal/get-cache";

export const pathIsValid = async (path: string): Promise<boolean> => {
  const allPaths = await getAllDrupalPaths();

  let isValid = false;
  allPaths.forEach(typePaths => {
    if (typePaths.includes(path)) isValid = true;
  })
  console.log(`valid path ${path}`, isValid);
  return isValid;
}

export const getAllDrupalPaths = async (bustCache?: boolean) => {
  const cachedPaths = nodeCache.get<Map<string, string[]>>('drupal-paths');
  if (!bustCache && cachedPaths) return cachedPaths;

  console.log('fetching the path info');
  const paths = new Map<string, string[]>();
  paths.set('node', await getNodePaths(bustCache));
  paths.set('redirect', await getRedirectPaths(bustCache));

  nodeCache.set('drupal-paths', paths);
  return paths;
}

export const getNodePaths = async (bustCache?: boolean): Promise<string[]> => {
  const params = new DrupalJsonApiParams();
  if (bustCache) params.addFields('cache', [new Date().toLocaleTimeString()])
  const pageLimit = 500;

  // Add a simple include so that it doesn't fetch all the data right now. The full node data comes later, we only need
  // the node paths.
  params.addInclude(['node_type']);
  params.addPageLimit(pageLimit);

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

export const getRedirectPaths = async (bustCache?: boolean): Promise<string[]> => {
  const params = new DrupalJsonApiParams();
  if (bustCache) params.addFields('cache', [new Date().toLocaleTimeString()])
  const pageLimit = 500;
  params.addPageLimit(pageLimit);

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

  return redirects.map(redirect => `/${redirect.redirect_source.path}`)
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
