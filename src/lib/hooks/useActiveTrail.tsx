
import {useCallback, useMemo} from "react";
import {DrupalMenuItem} from "@lib/drupal/get-menu";

const useActiveTrail = (menuItems: DrupalMenuItem[], currentPath?: string) => {

  const getActiveTrail = useCallback((menuItems: DrupalMenuItem[], trail: string[] = []): string[]  => {
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
  }, [currentPath]);

  return useMemo(() => getActiveTrail(menuItems), [getActiveTrail, menuItems]);
}

export default useActiveTrail;