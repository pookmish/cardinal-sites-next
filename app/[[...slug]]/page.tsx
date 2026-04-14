import NodePage from "@components/nodes/pages/node-page"
import {NodeUnion} from "@lib/gql/__generated__/graphql"
import {getAllNodes, getAllRedirectPaths, getEntityFromPath, getHomePagePath} from "@lib/gql/gql-queries"
import {notFound, redirect} from "next/navigation"
import {getPathFromContext, PageProps, Slug} from "@lib/utils/utils"

// Vercel max execution. See https://vercel.com/docs/functions/configuring-functions/duration
export const maxDuration = 30

const Page = async (props: PageProps) => {
  "use cache: remote"

  const params = await props.params
  const path = getPathFromContext(params.slug || "/")
  const homePath = await getHomePagePath()
  if (path === homePath) redirect("/")

  const {redirect: redirectPath, entity} = await getEntityFromPath<NodeUnion>(path)

  if (redirectPath) redirect(redirectPath)
  if (!entity) notFound()

  return <NodePage node={entity} isHome={path === "/"} />
}

export const generateStaticParams = async (): Promise<Array<Slug>> => {
  const homePagePath = await getHomePagePath()
  const redirectPaths = await getAllRedirectPaths()

  const paths = (await getAllNodes()).map(node => (node.path === homePagePath ? "/" : node.path)) as Array<string>
  redirectPaths.forEach(p => paths.push(p))
  const nodePaths = paths.map(path => ({slug: path.split("/").filter(part => !!part)}))
  nodePaths.push({slug: ["home"]})
  return nodePaths
}

export default Page
