"use client";

import Link from "@components/elements/link";
import {useCallback, useEffect, useRef, useState} from "react";
import {Bars3Icon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {XCircleIcon} from "@heroicons/react/24/outline";
import useNavigationEvent from "@lib/hooks/useNavigationEvent";
import SiteSearchForm from "@components/search/site-search-form";
import useActiveTrail from "@lib/hooks/useActiveTrail";
import {DrupalMenuLinkContent} from "@lib/types";
import useOutsideClick from "@lib/hooks/useOutsideClick";
import {usePathname} from "next/navigation";

const MainMenu = ({menuItems}: { menuItems: DrupalMenuLinkContent[] }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const browserUrl = useNavigationEvent()
  const activeTrail = useActiveTrail(menuItems, usePathname());
  const clickProps = useOutsideClick(() => setMenuOpen(false));

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && menuOpen) {
      setMenuOpen(false);

      // @ts-ignore
      buttonRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [browserUrl]);
  useEffect(() => {
    // Add keydown listener for escape button if the submenu is open.
    if (menuOpen) document.addEventListener("keydown", handleEscape);
    if (!menuOpen) document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <nav
      {...clickProps}
      className="lg:centered"
    >
      <button
        ref={buttonRef}
        className="flex flex-col items-center lg:hidden absolute top-5 right-10 group"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
      >
        {menuOpen &&
          <XCircleIcon height={40}/>
        }
        {!menuOpen &&
          <Bars3Icon height={40}/>
        }
        <span className="group-hocus:underline">{menuOpen ? "Close" : "Menu"}</span>
      </button>

      <div
        className={(menuOpen ? "block" : "hidden") + " lg:block bg-black lg:bg-transparent absolute top-100 lg:relative z-10 w-full"}>
        <SiteSearchForm className="px-10 lg:hidden"/>
        <ul
          className="list-unstyled lg:flex lg:justify-end flex-wrap m-0 p-0">
          {menuItems.map(item =>
            <MenuItem key={item.id} {...item} activeTrail={activeTrail}/>
          )}
        </ul>
      </div>
    </nav>
  )
}

interface MenuItemProps {
  id: string
  url: string
  title: string
  items: DrupalMenuLinkContent[]
  activeTrail: string[]
  level?: number
}

const MenuItem = ({id, url, title, items, activeTrail, level = 0}: MenuItemProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false)
  const browserUrl = useNavigationEvent()
  useEffect(() => setSubmenuOpen(false), [browserUrl]);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && submenuOpen) {
      setSubmenuOpen(false);

      // @ts-ignore
      buttonRef.current?.focus();
    }
  }, [submenuOpen]);


  useEffect(() => {
    // Add keydown listener for escape button if the submenu is open.
    if (submenuOpen) document.addEventListener("keydown", handleEscape);
    if (!submenuOpen) document.removeEventListener("keydown", handleEscape);
  }, [submenuOpen]);

  const zIndexes = [
    "z-[1]",
    "z-[2]",
    "z-[3]",
    "z-[4]",
    "z-[5]",
  ]
  const leftPadding = [
    'pl-10',
    'pl-20',
    'pl-28',
    'pl-48',
  ]

  const isCurrent = activeTrail.at(-1) === id;
  const inTrail = activeTrail.includes(id) && !isCurrent;

  const topItem: string[] = [
    'border-l-[6px]',
    'lg:border-l-0',
    'lg:border-b-[6px]',
    isCurrent ? "border-digital-red lg:border-black" : (inTrail ? "border-transparent lg:border-foggy-dark" : "border-transparent"),
    'ml-5',
    'lg:ml-0',
    leftPadding[level]
  ]
  const childItem: string[] = [
    'border-l-[6px]',
    isCurrent ? "border-digital-red" : "border-transparent",
    'ml-5',
    'lg:ml-0',
    'lg:pl-5',
    leftPadding[level]
  ];

  const itemStyles: string = level === 0 ? topItem.join(' ') : childItem.join(' ');
  const itemProps = useOutsideClick(() => setSubmenuOpen(false));

  return (
    <li
      {...itemProps}
      className={"m-0 py-2 lg:py-0 relative border-b first:border-t last:border-0 border-cool-grey lg:border-black-20 lg:relative lg:mr-5 last:lg:mr-0 " + (level === 0 ? "lg:border-b-0 first:border-t-0" : "")}
    >
      <div className="flex items-center justify-between lg:justify-end">
        <Link
          href={url}
          className={`w-full relative inline-block text-white lg:text-cardinal-red hocus:text-white lg:hocus:text-black no-underline hocus:underline py-5 lg:pl-0 ${itemStyles}`}
          aria-current={isCurrent ? "true" : undefined}
        >
          {title}
        </Link>

        {items.length > 0 &&
          <>
            {level === 0 && <div className="block ml-5 w-[1px] h-[25px] mb-[6px]  bg-archway-light shrink-0"/>}
            <button
              ref={buttonRef}
              className="shrink-0 mb-[6px] relative right-10 lg:right-0 text-white lg:text-cardinal-red bg-cardinal-red lg:bg-transparent rounded-full lg:rounded-none group border-b border-transparent hocus:border-black hocus:bg-white"
              onClick={() => setSubmenuOpen(!submenuOpen)}
              aria-expanded={submenuOpen}
            >
              <ChevronDownIcon
                height={35}
                className={(submenuOpen ? "rotate-180" : "") + " transition group-hocus:scale-125 group-hocus:text-black ease-in-out duration-150"}
              />
              <span className="sr-only">{submenuOpen ? "Close" : "Open"} {title} Submenu</span>
            </button>

          </>
        }

      </div>

      {items &&
        <ul
          className={(submenuOpen ? "block" : "hidden") + " list-unstyled w-full min-w-[300px] lg:bg-white lg:shadow-2xl px-0 " + (level === 0 ? "lg:absolute lg:top-full lg:left-0 " : "") + zIndexes[level]}>
          {items.map(item =>
            <MenuItem
              key={item.id}
              {...item}
              level={level + 1}
              activeTrail={activeTrail}
            />
          )}
        </ul>
      }
    </li>
  )
}
export default MainMenu;