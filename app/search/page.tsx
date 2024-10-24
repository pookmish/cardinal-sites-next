import {H1} from "@components/elements/headers"
import {getAlgoliaCredential} from "@lib/gql/gql-queries"
import {IndexUiState} from "instantsearch.js/es/types/ui-state"
import AlgoliaSearch from "@components/algolia/algolia-search"
import SiteSearch from "@components/search/site-search"
import {redirect} from "next/navigation"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false
// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60

export const metadata = {
  title: "Search",
  description: "Search the site",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
}
const Page = async (props: {searchParams?: Promise<Record<string, string>>}) => {
  const searchParams = await props.searchParams

  // Honeypot check.
  if (searchParams?.search) redirect("/search")
  const [appId, indexName, apiKey] = await getAlgoliaCredential()

  const initialState: IndexUiState = {refinementList: {}}
  if (searchParams?.q) initialState.query = searchParams.q as string

  return (
    <div className="centered mt-32">
      <div className="mx-auto 3xl:w-10/12">
        <H1 className="mb-44" id="page-title">
          Search
        </H1>

        {appId && indexName && apiKey && (
          <AlgoliaSearch appId={appId} searchIndex={indexName} searchApiKey={apiKey} initialUiState={initialState} />
        )}

        {!appId && <SiteSearch search={searchParams?.q || ""} />}
        <noscript>Please enable javascript to view search results</noscript>
      </div>
    </div>
  )
}

export default Page
