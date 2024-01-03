"use client";

export const syncDrupalPreviewRoutes = (path?: string) => {
  if (path && window && window.top !== window.self) {
    window.parent.postMessage(
      {type: "NEXT_DRUPAL_ROUTE_SYNC", path},
      process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string
    )
  }
}
