import {notFound, redirect} from "next/navigation";
import NodePage from "@components/nodes/pages/node-page";
import {Metadata} from "next";
import {getNodePaths} from "@lib/drupal/get-paths";
import {getNodeMetadata} from "./metadata";
import {getPathFromContext, isDraftMode} from "@lib/drupal/utils";
import {PageProps, Params} from "@lib/types";
import {getEntityFromPath} from "@lib/gql/fetcher";
import {NodeUnion} from "@lib/gql/__generated__/drupal";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;
export const dynamic = 'force-static';

const Page = async ({params}: PageProps) => {
  const path = getPathFromContext({params})

  const {redirect: redirectPath, entity, error} = await getEntityFromPath<NodeUnion>(path, isDraftMode())
  if (error) throw new Error(error);

  if (redirectPath?.url) redirect(redirectPath.url)
  if (!entity) notFound();

  return (
    <NodePage node={entity}/>
  )
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  // If the user is in draft mode, there's no need to emit any customized metadata.
  if (isDraftMode()) return {};

  const path = getPathFromContext({params})
  const {entity} = await getEntityFromPath<NodeUnion>(path)
  return entity ? getNodeMetadata(entity) : {};
}

export const generateStaticParams = async (): Promise<Params[]> => {
  if (process.env.BUILD_COMPLETE !== 'true') return []
  const nodePaths = await getNodePaths();
  if (nodePaths) return nodePaths.filter(path => path !== '/')
    .map(path => ({slug: path.replace(/^\//, '').split('/')}))
  return [];
}

export default Page;