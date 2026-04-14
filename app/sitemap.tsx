import {MetadataRoute} from "next"
import {getAllNodes, getHomePagePath} from "@lib/gql/gql-queries"

export const dynamic = "force-static"

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  "use cache: remote"

  const homePagePath = await getHomePagePath()
  const nodes = await getAllNodes()
  const sitemap: MetadataRoute.Sitemap = []

  nodes.map(node =>
    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_DOMAIN || ""}${node.path === homePagePath ? "/" : node.path}`,
      lastModified: new Date(node.changed.time),
      priority: node.__typename === "NodeStanfordPage" ? 1 : 0.8,
      changeFrequency: node.__typename === "NodeStanfordPage" ? "weekly" : "monthly",
    })
  )

  return sitemap
}

export default Sitemap
