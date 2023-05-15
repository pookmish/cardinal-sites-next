'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from "react";
import {syncDrupalPreviewRoutes} from "@/lib/drupal/sync-drupal-preview-path";

const useNavigationEvent = () => {
  const isInitialMount = useRef(true);
  const [url, setUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (pathname !== url && !(pathname?.startsWith('/calendar/') || pathname?.startsWith('/study-place/'))) {
      setUrl(pathname ? pathname : null);
    }
  }, [url, pathname]);

  useEffect(() => syncDrupalPreviewRoutes(url), [url])
  return url;
}

export default useNavigationEvent;