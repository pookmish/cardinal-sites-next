import {getSearchIndex} from "@lib/drupal/get-search-index";
import SearchResults from "./search-results";
import {getNodeMetadata} from "../[...slug]/metadata";
import {H1} from "@components/elements/headers";
import {StanfordNode} from "@lib/types";
import {Suspense} from "react";
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

    const searchResults: StanfordNode[] = await getSearchIndex('full_site_content', {params: {'filter[fulltext]': searchString}});
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
      <H1>Search</H1>

      <Suspense fallback={<></>}>
        <SearchResults search={search}/>
      </Suspense>
    </div>
  )
}
export default Page;