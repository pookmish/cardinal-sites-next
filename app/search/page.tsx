import {getSearchIndex} from "@/lib/drupal/get-search-index";
import {DrupalNode} from "next-drupal";
import SearchResults from "./search-results";
import {getNodeMetadata} from "../[...slug]/metadata";

export const metadata = {
  title: "Search",
  description: "Search the site",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  }
}
const Page = () => {

  const search = async (searchString: string) => {
    "use server";

    const searchResults: DrupalNode[] = await getSearchIndex('full_site_content', {params: {'filter[fulltext]': searchString}});
    return searchResults.map(node => ({
      id: node.id,
      type: node.type,
      path: node.path.alias,
      changed: node.changed,
      ...getNodeMetadata(node)
    })).slice(0, 20)
  }
  return (
    <div className="centered mt-32">
      <h1>Search</h1>

      <SearchResults search={search}/>

    </div>
  )
}
export default Page;