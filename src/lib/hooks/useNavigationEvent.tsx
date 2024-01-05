'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useState} from "react";
import {syncDrupalPreviewRoutes} from "@lib/drupal/sync-drupal-preview-path";

const useNavigationEvent = () => {
  const [url, setUrl] = useState<string | null>();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    if (pathname !== url && !(pathname?.startsWith('/gallery-image/'))) {
      setUrl(pathname ? pathname : null);
    }
  }, [url, pathname]);

  useEffect(() => syncDrupalPreviewRoutes(url || ''), [url])
  return url;
}

export default useNavigationEvent;