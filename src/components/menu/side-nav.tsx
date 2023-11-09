"use client";

import {useMemo} from "react";
import useActiveTrail from "@lib/hooks/useActiveTrail";
import Link from "@components/elements/link";
import {DrupalMenuLinkContent} from "@lib/types";

const SideNav = ({menuItems, currentPath}: { menuItems: DrupalMenuLinkContent[], currentPath?: string }) => {
  const activeTrail = useActiveTrail(menuItems, currentPath);

  // Peel off the menu items from the parent.
  const topMenuItem: DrupalMenuLinkContent | undefined = activeTrail.length > 0 ? menuItems.find(item => item.id === activeTrail[0]) : undefined;
  const subTree = useMemo(() => topMenuItem && topMenuItem?.items ? topMenuItem.items : [], [activeTrail, topMenuItem]);

  if (typeof subTree === 'undefined' || (subTree.length <= 1 && typeof subTree[0]?.items == 'undefined')) {
    return null;
  }

  return (
    <aside className="hidden lg:block w-1/4 shrink-0">
      <nav>
        <ul className="list-unstyled">
          {subTree.map(item =>
            <MenuItem key={item.id} {...item} activeTrail={activeTrail}/>
          )}
        </ul>
      </nav>
    </aside>
  )
}

interface MenuItemProps {
  id: string
  url: string
  title: string
  items?: DrupalMenuLinkContent[]
  activeTrail: string[]
  level?: number
}

const MenuItem = ({id, url, title, items, activeTrail, level = 0}: MenuItemProps) => {
  const leftPadding = [
    'pl-10',
    'pl-20',
    'pl-28',
    'pl-48',
  ]
  const regularClasses = [
    'text-digital-red',
    'hocus:text-black',
    'hocus:before:content-[""]',
    'hocus:before:block',
    'hocus:before:w-[6px]',
    'hocus:before:h-full',
    'hocus:before:bg-black',
    'hocus:before:absolute',
    'hocus:before:left-0',
    'hocus:before:top-0',
    'before:scale-y-[1]',
    'before:transition',
  ].join(' ');
  const activeClasses = [
    'text-black',
    'before:content-[""]',
    'before:block',
    'before:w-[6px]',
    'before:h-full',
    'before:bg-black',
    'before:absolute',
    'before:left-0',
    'before:top-0',
  ].join(' ')

  return (
    <li className="m-0 p-0 border-b">
      <Link
        href={url}
        className={(activeTrail.at(-1) === id ? activeClasses : regularClasses) + " w-full inline-block relative no-underline hocus:underline pl-10 py-5"}
        aria-current={activeTrail.at(-1) === id ? "true" : undefined}
      >
        {title}
      </Link>
      {(items && items.length > 0 && activeTrail.includes(id)) &&
        <ul className={`border-t list-unstyled ${leftPadding[level]}`}>
          {items.map(item =>
            <MenuItem key={item.id} {...item} level={level + 1} activeTrail={activeTrail}/>
          )}
        </ul>
      }
    </li>
  )
}

export default SideNav;