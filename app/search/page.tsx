import {getSearchIndex} from "@lib/drupal/get-search-index";
import SearchResults, {SearchResult} from "./search-results";
import {H1} from "@components/elements/headers";
import {DrupalNode} from "next-drupal";
import {Suspense} from "react";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;
export const dynamic = 'force-static';

export const metadata = {
  title: "Search",
  description: "Search the site",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  }
}
const Page = async ({searchParams}: { searchParams?: { [_key: string]: string } }) => {

  const search = async (searchString: string): Promise<SearchResult[]> => {
    "use server";

    const params = new DrupalJsonApiParams();
    params.addCustomParam({'filter[fulltext]': searchString})

    // This still uses JSON API because GraphQL doesn't have an easy way to search for content.
    const searchResults: DrupalNode[] = await getSearchIndex('full_site_content', {params: params.getQueryObject()});

    return searchResults.map(node => ({
      id: node.id,
      title: node.title,
      path: node.path.alias,
      changed: node.changed,
    })).slice(0, 20)
  }

  const initialResults = await search(searchParams?.q || '');
  return (
    <div className="centered mt-32">
      <H1>Search</H1>

      <Suspense fallback={<></>}>
        <SearchResults search={search} initialSearchString={searchParams?.q || ''} initialResults={initialResults}/>
      </Suspense>
    </div>
  )
}

export default Page;