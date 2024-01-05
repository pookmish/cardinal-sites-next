import {notFound, redirect} from "next/navigation";
import NodePage from "@components/nodes/pages/node-page";
import {Metadata} from "next";
import {getAllDrupalPaths, pathIsValid} from "@lib/drupal/get-paths";
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
  const path = getPathFromContext({params})
  if (!await pathIsValid(path)) notFound();

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
  if (!await pathIsValid(path, 'node')) return {};

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
  const allPaths = await getAllDrupalPaths();
  const nodePaths = allPaths.get('node');

  let params: Params[] = [];
  if (nodePaths) {
    params = nodePaths.map(path => ({slug: path.split('/')}))
  }
  return process.env.BUILD_COMPLETE === 'true' ? params : params.slice(0, 1);
}

export default Page;