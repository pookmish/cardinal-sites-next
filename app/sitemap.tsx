import {MetadataRoute} from "next";
import {getAllDrupalPaths} from "@lib/drupal/get-paths";

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const allPaths = await getAllDrupalPaths();
  const urls: MetadataRoute.Sitemap = [];
  allPaths.get('node')?.map(path => urls.push({url: `/${path}`}))
  return urls
}
export default Sitemap;