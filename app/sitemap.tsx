import {MetadataRoute} from "next";
import {getAllNodePaths} from "@lib/gql/fetcher";

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const nodePaths = await getAllNodePaths()
  return nodePaths.map(path => ({url: path}));
}
export default Sitemap;