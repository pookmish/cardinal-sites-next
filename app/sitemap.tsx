import {MetadataRoute} from "next";

const xml2js = require('xml2js');

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const xmlParser = new xml2js.Parser();

  const urls: MetadataRoute.Sitemap = [];

  interface DrupalSitemapItem {
    loc: string[];
    lastmod?: string[];
  }

  interface DrupalSitemap {
    urlset: {
      url: DrupalSitemapItem[];
    }
  }

  const drupalSitemap: DrupalSitemapItem[] = await fetch(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/sitemap.xml')
    .then(response => response.text())
    .then<Promise<DrupalSitemap>>(result => xmlParser.parseStringPromise(result))
    .then(sitemap => sitemap['urlset'].url);

  const publicDomain = process.env.NEXT_PUBLIC_DOMAIN ?? '';
  drupalSitemap?.map(item => {
    urls.push({
      url: item.loc[0].replace(/http[s]?:\/\/.*?\//g, publicDomain + `/`),
      lastModified: item.lastmod?.[0],
    })
  })

  return urls
}
export default Sitemap;