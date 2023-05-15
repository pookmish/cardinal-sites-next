"use client";

import {usePathname} from "next/navigation";
import {useMemo} from "react";

const useActiveTrail = (menuItems) => {
  const currentPath = usePathname();

  const getActiveTrail = (menuItems, trail: string[] = []) => {
    let childTrail, currentTrail;
    for (let i = 0; i < menuItems.length; i++) {
      currentTrail = [...trail];
      currentTrail.push(menuItems[i].id);

      if (currentPath === menuItems[i].url) {
        return currentTrail;
      }

      if (typeof menuItems[i].items === 'object') {
        childTrail = getActiveTrail(menuItems[i].items, [...currentTrail]);
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