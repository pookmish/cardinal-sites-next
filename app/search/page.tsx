import {getSearchIndex} from "@/lib/drupal/get-search-index";
import {DrupalNode} from "next-drupal";
import SearchResults from "./search-results";

const Page = () => {

  const search = async (searchString: string) => {
    "use server";

    const searchResults: DrupalNode[] = await getSearchIndex('full_site_content', {params: {'filter[fulltext]': searchString}});
    return searchResults.map(node => ({
      id: node.id,
      type: node.type,
      title: node.title,
      path: node.path,
      changed: node.changed
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