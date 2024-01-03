import {getSearchIndex} from "@lib/drupal/get-search-index";
import SearchResults, {SearchResult} from "./search-results";
import {H1} from "@components/elements/headers";
import {DrupalNode} from "next-drupal";
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

  const search = async (searchString: string): Promise<SearchResult[]> => {
    "use server";

    // This still uses JSON API because GraphQL doesn't have an easy way to search for content.
    const searchResults: DrupalNode[] = await getSearchIndex('full_site_content', {params: {'filter[fulltext]': searchString}});

    return searchResults.map(node => ({
      id: node.id,
      title: node.title,
      path: node.path.alias,
      changed: node.changed,
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