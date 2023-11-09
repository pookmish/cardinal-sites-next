import {getResourceFromContext} from "@lib/drupal/get-resource";
import {translatePathFromContext} from "@lib/drupal/translate-path";
import {DrupalNode} from "next-drupal";
import {notFound, redirect} from "next/navigation";
import NodePage from "@components/nodes/pages/node-page";
import {GetStaticPathsResult, GetStaticPropsContext, Metadata} from "next";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getPathsFromContext} from "@lib/drupal/get-paths";
import {getNodeMetadata} from "./metadata";
import {getAccessToken} from "@lib/drupal/get-access-token";
import {isDraftMode} from "@lib/drupal/utils";

export const revalidate = 86400;

export const generateMetadata = async (context: GetStaticPropsContext): Promise<Metadata> => {
  let node: DrupalNode;
  try {
    node = await getPageData(context);
    return getNodeMetadata(node);
  } catch (e) {

  }
  return {}
}

class RedirectError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

const getPageData = async (context: GetStaticPropsContext) => {
  const draftDev = isDraftMode()
  const accessToken = draftDev ? await getAccessToken(true) : null;

  const path = await translatePathFromContext(context, accessToken ? {accessToken} : {});
  // Check for redirect.
  if (path?.redirect?.[0].to) {
    const currentPath = '/' + (typeof context?.params?.slug === 'object' ? context.params.slug.join('/') : context?.params?.slug);
    const [destination] = path.redirect;

    if (destination.to != currentPath) {
      throw new RedirectError(destination.to);
    }
  }

  if (!path || !path.jsonapi) {
    throw new Error('Unable to translate path')
  }

  if (context?.params?.slug?.[0] === 'node' && path?.entity?.path) {
    throw new RedirectError(path.entity.path);
  }
  return getResourceFromContext<DrupalNode>(path.jsonapi.resourceName, context, {}, draftDev)
}

export const generateStaticParams = async () => {
  const params = new DrupalJsonApiParams();
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

  let paths: GetStaticPathsResult["paths"] = await getPathsFromContext(contentTypes, {}, {params: params.getQueryObject()});

  let fetchMore = process.env.BUILD_COMPLETE === 'true';
  let fetchedData: GetStaticPathsResult["paths"] = []
  let page = 1;
  while (fetchMore) {
    console.log('Fetching page ' + page);
    params.addPageOffset(page * 50);

    fetchedData = await getPathsFromContext(contentTypes, {}, {params: params.getQueryObject()})
    paths = [...paths, ...fetchedData];
    fetchMore = fetchedData.length > 0;
    page++;
  }

  return paths.map(path => typeof path !== "string" ? path?.params : path).slice(0, (process.env.BUILD_COMPLETE === 'true' ? -1 : 1));
}

const Page = async (context: GetStaticPropsContext) => {
  let node;
  try {
    node = await getPageData(context);
  } catch (e) {
    if (e instanceof RedirectError) {
      redirect(e.message);
    }
  }
  if (!node) notFound();

  return (
    <NodePage node={node}/>
  )
}

export default Page;