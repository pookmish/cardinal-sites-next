import {notFound, redirect} from "next/navigation";
import NodePage from "@components/nodes/pages/node-page";
import {Metadata} from "next";
import {getAllDrupalPaths, pathIsValid} from "@lib/drupal/get-paths";
import {getNodeMetadata} from "./metadata";
import {getPathFromContext, isDraftMode} from "@lib/drupal/utils";
import {PageProps, Params} from "@lib/types";
import {getEntityFromPath} from "@lib/gql/fetcher";
import {NodeUnion} from "@lib/gql/__generated__/drupal";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;

const Page = async ({params}: PageProps) => {
  const path = getPathFromContext({params})
  if (!await pathIsValid(path)) notFound();

  const routeInfo = await getEntityFromPath<NodeUnion>(path, isDraftMode())
  if (routeInfo?.redirect?.url) redirect(routeInfo.redirect.url)
  if (!routeInfo?.entity) notFound();

  return (
    <NodePage node={routeInfo.entity}/>
  )
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  const path = getPathFromContext({params})
  if (!await pathIsValid(path, 'node')) return {};

  try {
    const routeInfo = await getEntityFromPath<NodeUnion>(path, isDraftMode())
    if (routeInfo?.entity) return getNodeMetadata(routeInfo.entity);
  } catch (e) {
  }
  return {}
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const allPaths = await getAllDrupalPaths();
  const nodePaths = allPaths.get('node');

  let params: Params[] = [];
  if (nodePaths) {
    params = nodePaths.map(path => ({slug: path.split('/')}))
  }
  return process.env.BUILD_COMPLETE === 'true' ? params : params.slice(0, 1);
}

export default Page;