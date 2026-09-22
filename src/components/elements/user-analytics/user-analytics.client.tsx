"use client"

import Script from "next/script"
import {GoogleAnalytics, GoogleTagManager} from "@next/third-parties/google"
import {usePathname} from "next/navigation"

type Props = {
  ga4Ids: string[]
  gtmId?: string
}

/**
 * The analytics tags live in the root layout, which is shared with the editor preview routes. Gate
 * them on the browser path so draft page views aren't reported alongside real site traffic.
 */
const UserAnalyticsScripts = ({ga4Ids, gtmId}: Props) => {
  const pathname = usePathname()
  if (pathname.startsWith("/preview")) return

  return (
    <>
      <Script async src="https://siteimproveanalytics.com/js/siteanalyze_6343745.js" />
      {ga4Ids.map(ga4ID => (
        <GoogleAnalytics key={ga4ID} gaId={ga4ID} />
      ))}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  )
}
export default UserAnalyticsScripts
