import {notFound, redirect} from "next/navigation";
import NodePage from "@components/nodes/pages/node-page";
import {GetStaticPathsResult, Metadata} from "next";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getPathsFromContext} from "@lib/drupal/get-paths";
import {getNodeMetadata} from "./metadata";
import {getPathFromContext, isDraftMode} from "@lib/drupal/utils";
import {PageProps, Params, StanfordNode} from "@lib/types";
import {getResourceByPath, getResourceFromContext} from "@lib/drupal/get-resource";
import {getAccessToken} from "@lib/drupal/get-access-token";
import {translatePathFromContext} from "@lib/drupal/translate-path";
import RedirectError from "@lib/redirect-error";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;

const Page = async ({params}: PageProps) => {
  let node = null;
  try {
    node = await getPageData(params);
  } catch (e) {
    if (e instanceof RedirectError) redirect(e.message);
  }

  if (!node) notFound();

  return (
    <NodePage node={node}/>
  )
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  const path = getPathFromContext({params})

  try {
    const node = await getResourceByPath<StanfordNode>(path)
    if (node) return getNodeMetadata(node);
  } catch (e) {
  }
  return {}
}

const getPageData = async(params: Params): Promise<StanfordNode | undefined> => {
  const draftMode = isDraftMode()
  const accessToken = draftMode ? await getAccessToken(true) : null;

  const path = await translatePathFromContext({params}, accessToken ? {accessToken} : {});

  // Check for redirect.
  if (path?.redirect && path?.redirect?.[0].to) {
    const currentPath = '/' + (typeof params?.slug === 'object' ? params.slug.join('/') : params?.slug);

    const [destination] = path.redirect;

    if (destination.to != currentPath) throw new RedirectError(destination.to);
  }

  if (!path || !path.jsonapi) throw new Error('Unable to translate path')
  if (params?.slug?.[0] === 'node' && path?.entity?.path) throw new RedirectError(path.entity.path);

  return getResourceFromContext<StanfordNode>(path.jsonapi.resourceName, {params}, {draftMode})
}

export const generateStaticParams = async () => {
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

  // Use JSON API to fetch the list of all node paths on the site.
  let paths: GetStaticPathsResult["paths"] = await getPathsFromContext(contentTypes, {params: params.getQueryObject()});

  const completeBuild = process.env.BUILD_COMPLETE === 'true';

  let fetchMore = completeBuild;
  let fetchedData: GetStaticPathsResult["paths"] = []
  let page = 1;
  while (fetchMore) {
    console.log('Fetching page ' + page);
    params.addPageOffset(page * 50);

    fetchedData = await getPathsFromContext(contentTypes, {params: params.getQueryObject()})
    paths = [...paths, ...fetchedData];
    fetchMore = fetchedData.length > 0;
    page++;
  }

  return paths.filter(path => typeof path !== 'object' || path.params?.slug?.[0])
    .map(path => typeof path === "object" ? path?.params : path)
    .slice(0, (completeBuild ? -1 : 1))
}

export default Page;