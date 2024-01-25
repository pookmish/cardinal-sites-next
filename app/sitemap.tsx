import {MetadataRoute} from "next";
import {getNodePaths} from "@lib/drupal/get-paths";

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const allPaths = await getNodePaths();
  const urls: MetadataRoute.Sitemap = [];
  allPaths.map(url => urls.push({url}))
  return urls
}
export default Sitemap;