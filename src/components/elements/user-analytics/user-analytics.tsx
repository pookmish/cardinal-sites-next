import {getConfigPageField} from "@lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/graphql"
import UserAnalyticsScripts from "@components/elements/user-analytics/user-analytics.client"

const UserAnalytics = async () => {
  if (process.env.NODE_ENV === "development") return

  const ga4 = await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suGoogleAnalytics"]>(
    "StanfordBasicSiteSetting",
    "suGoogleAnalytics"
  )

  const gtm = process.env.NEXT_PUBLIC_GTM
  if (!ga4 && !gtm) return

  const ga4Ids = (ga4 || "")
    .split(",")
    .map(ga4ID => ga4ID.trim())
    .filter(Boolean)

  return <UserAnalyticsScripts ga4Ids={ga4Ids} gtmId={gtm} />
}
export default UserAnalytics
