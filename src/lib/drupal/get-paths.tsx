import {AccessToken, JsonApiParams, JsonApiResourceWithPath} from "next-drupal";
import {getResourceCollection} from "@lib/drupal/get-resource";
import {PageProps, Params} from "@lib/types";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getPathFromContext, isDraftMode} from "@lib/drupal/utils";
import {DrupalRedirect} from "@lib/drupal/drupal-jsonapi.types";

export const pathIsValid = async (path: string, type?: 'node' | 'redirect') => {
  if (isDraftMode()) return true;
  const drupalPaths = await getAllDrupalPaths();
  if (type) {
    return drupalPaths.get(type)?.includes(path);
  }
  let allPaths: string[] = [];
  drupalPaths.forEach(typePaths => allPaths = [...allPaths, ...typePaths])
  console.log(`${path} is valid`, allPaths.includes(path))
  return allPaths.includes(path);
}

export const getAllDrupalPaths = async (): Promise<Map<string, string[]>> => {
  const paths = new Map();
  paths.set('node', await getNodePaths())
  paths.set('redirect', await getRedirectPaths())
  return paths;
}

const getNodePaths = async (): Promise<string[]> => {
  const params = new DrupalJsonApiParams();
  // Add a simple include so that it doesn't fetch all the data right now. The full node data comes later, we only need
  // the node paths.
  params.addInclude(['node_type']);
  params.addPageLimit(50);

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
    params.addPageOffset(page * 50);

    // Use JSON API to fetch the list of all node paths on the site.
    fetchedData = await getPathsFromContext(contentTypes, {params: params.getQueryObject(), next: {tags: ['paths']}})
    paths = [...paths, ...fetchedData];
    fetchMore = fetchedData.length > 0;
    page++;
  }
  return paths.map(pagePath => getPathFromContext(pagePath)).filter(path => !!path);
}

const getRedirectPaths = async (): Promise<string[]> => {
  const params = new DrupalJsonApiParams();
  params.addPageLimit(50);

  let redirects: DrupalRedirect[] = []
  let fetchMore = true;
  let fetchedData: DrupalRedirect[] = []
  let page = 0;

  while (fetchMore) {
    params.addPageOffset(page * 50);

    // Use JSON API to fetch the list of all node paths on the site.
    fetchedData = await getResourceCollection<DrupalRedirect>('redirect--redirect', {
      params: params.getQueryObject(),
      next: {tags: ['paths']}
    })
    redirects = [...redirects, ...fetchedData];

    fetchMore = fetchedData.length === 50;
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
  } = {}
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
