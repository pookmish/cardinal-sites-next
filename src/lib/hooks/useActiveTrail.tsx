"use client";

import {usePathname} from "next/navigation";
import {useMemo} from "react";
import {DrupalMenuLinkContent} from "next-drupal";

const useActiveTrail = (menuItems: DrupalMenuLinkContent[], originalPath?: string) => {
  const pathName = usePathname();
  const currentPath = originalPath || pathName;

  const getActiveTrail = (menuItems: DrupalMenuLinkContent[], trail: string[] = []): string[] => {
    let childTrail, currentTrail;
    for (let i = 0; i < menuItems.length; i++) {
      currentTrail = [...trail];
      currentTrail.push(menuItems[i].id);

      if (currentPath === menuItems[i].url) {
        return currentTrail;
      }

      const childrenItems = menuItems[i].items;

      if (childrenItems) {
        childTrail = getActiveTrail(childrenItems, [...currentTrail]);
        if (childTrail.length > 0) {
          return childTrail;
        }
      }

    }
    return [];
  }
  return useMemo(() => getActiveTrail(menuItems), [useMemo, menuItems, currentPath]);
}

export default useActiveTrail;