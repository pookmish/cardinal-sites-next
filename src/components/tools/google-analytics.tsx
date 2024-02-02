"use client";

import {GoogleAnalytics as GA} from "nextjs-google-analytics";

const GoogleAnalytics = ({gaMeasurementId}: { gaMeasurementId: string }) => {
  return <GA gaMeasurementId={gaMeasurementId} trackPageViews/>
}
export default GoogleAnalytics;