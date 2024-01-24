import {notFound, redirect} from "next/navigation";
import NodePage from "@components/nodes/pages/node-page";
import {Metadata} from "next";
import {getAllDrupalPaths} from "@lib/drupal/get-paths";
import {getNodeMetadata} from "./metadata";
import {getPathFromContext, isDraftMode} from "@lib/drupal/utils";
import {PageProps, Params} from "@lib/types";
import {getEntityFromPath} from "@lib/gql/fetcher";
import {NodeUnion} from "@lib/gql/__generated__/drupal";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;
export const dynamic = 'force-static';

const Page = async ({params}: PageProps) => {
  const draftMode = isDraftMode();
  const path = getPathFromContext({params})
  // if (!draftMode && !await pathIsValid(path)) notFound();

  const {redirect: redirectPath, entity} = await getEntityFromPath<NodeUnion>(path, draftMode)
  if (redirectPath?.url) redirect(redirectPath.url)
  if (!entity) notFound();

  return (
    <NodePage node={entity}/>
  )
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  const path = getPathFromContext({params})
  if (isDraftMode() || !await pathIsValid(path, 'node')) return {};

  const {entity} = await getEntityFromPath<NodeUnion>(path, isDraftMode())
  return entity ? getNodeMetadata(entity) : {};
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const allPaths = await getAllDrupalPaths();
  const nodePaths = allPaths.get('node');

  let params: Params[] = [];
  if (nodePaths) {
    params = nodePaths.map(path => ({slug: path.split('/')}))
  }
  return process.env.BUILD_COMPLETE === 'true' ? params : [];
}

const pathIsValid = async (path: string) => {
  const drupalPaths = await getAllDrupalPaths();
  let allPaths: string[] = [];
  drupalPaths.forEach(typePaths => allPaths = [...allPaths, ...typePaths])

  return allPaths.includes(path);
}

export default Page;