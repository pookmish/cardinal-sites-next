import {notFound, redirect} from "next/navigation";
import NodePage from "@components/nodes/pages/node-page";
import {Metadata} from "next";
import {getAllDrupalPaths, getNodePaths, pathIsValid} from "@lib/drupal/get-paths";
import {getNodeMetadata} from "./metadata";
import {getPathFromContext, isDraftMode} from "@lib/drupal/utils";
import {PageProps, Params} from "@lib/types";
import {getEntityFromPath} from "@lib/gql/fetcher";
import {NodeUnion} from "@lib/gql/__generated__/drupal";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;
export const dynamic = 'force-static';

const Page = async ({params}: PageProps) => {
  console.log('Page', 1);
  const draftMode = isDraftMode();
  const path = getPathFromContext({params})
  console.log(2, path);
  const valid = await pathIsValid(path);
  // When in draft mode, the user may be on an unpublished page. Don't check validity.
  if (!valid) notFound();
  console.log('Page', 3);

  const {redirect: redirectPath, entity} = await getEntityFromPath<NodeUnion>(path, draftMode)
  console.log('Page', 4)
  if (redirectPath?.url) redirect(redirectPath.url)
  console.log('Page', 5);
  if (!entity) notFound();
  console.log('Page', 6);
  return (
    <NodePage node={entity}/>
  )
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  console.log('generateMetadata1')
  // If the user is in draft mode, there's no need to emit any customized metadata.
  if (isDraftMode()) return {};
  console.log('generateMetadata2')
  const path = getPathFromContext({params})
  const allPaths = await getAllDrupalPaths();
  if (!allPaths.get('node')?.includes(path)) return {}
  console.log('generateMetadata3')
  const {entity} = await getEntityFromPath<NodeUnion>(path, isDraftMode())
  return entity ? getNodeMetadata(entity) : {};
}

export const generateStaticParams = async (): Promise<Params[]> => {
  console.log('generateStaticParams', 1);
  if (process.env.BUILD_COMPLETE !== 'true') return []
  console.log('generateStaticParams', 2);
  const nodePaths = await getNodePaths();
  if (nodePaths) {
    return nodePaths.filter(path => path !== '/')
      .map(path => ({slug: path.replace(/^\//, '').split('/')}))
  }
  console.log('generateStaticParams', 3);
  return [];
}

export default Page;