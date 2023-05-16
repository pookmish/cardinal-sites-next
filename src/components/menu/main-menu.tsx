"use client";

import Link from "@/components/elements/link";
import {useEffect, useState} from "react";
import OutsideClickHandler from "@/components/tools/outside-click-handler";
import {Bars3Icon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {XCircleIcon} from "@heroicons/react/24/outline";
import useNavigationEvent from "@/lib/hooks/useNavigationEvent";
import SiteSearchForm from "@/components/search/site-search-form";
import useActiveTrail from "@/lib/hooks/useActiveTrail";

const MainMenu = ({menuItems}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const browserUrl = useNavigationEvent()
  const activeTrail = useActiveTrail(menuItems);

  useEffect(() => setMenuOpen(false), [browserUrl]);
  return (
    <OutsideClickHandler
      component="nav"
      onClickOutside={() => setMenuOpen(false)}
      className="lg:cc"
    >
      <button
        className="flex flex-col items-center lg:hidden absolute top-10 right-10"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
      >
        {menuOpen &&
          <XCircleIcon height={40}/>
        }
        {!menuOpen &&
          <Bars3Icon height={40}/>
        }
        <span aria-hidden>{menuOpen ? "Close" : "Menu"}</span>
        <span className="sr-only">{menuOpen ? "Close" : "Open"} Menu</span>
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
    </OutsideClickHandler>
  )
}
const MenuItem = ({id, url, title, items, activeTrail, level = 0}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const browserUrl = useNavigationEvent()
  useEffect(() => setSubmenuOpen(false), [browserUrl]);

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
  const currentPage = (level === 0 ? [
    'lg:text-black',
    'after:content-[""]',
    'after:absolute',
    'after:block',
    'after:w-full',
    'after:bottom-0',
    'after:left-0',
    'after:h-2',
    'after:bg-black'
  ] : []).join(' ')
  const inTrail = (level === 0 ? [
    'lg:text-black',
    'lg:after:content-[""]',
    'lg:after:absolute',
    'lg:after:block',
    'lg:after:w-full',
    'lg:after:bottom-0',
    'lg:after:left-0',
    'lg:after:h-2',
    'lg:after:bg-foggy-dark',
  ] : []).join(' ')
  return (
    <OutsideClickHandler
      component="li"
      onClickOutside={() => setSubmenuOpen(false)}
      className={"m-0 py-2 lg:py-0 relative  border-b border-cool-grey lg:border-black-20 lg:relative lg:mr-5 last:lg:mr-0 " + (level === 0 ? "lg:border-b-0" : "")}
    >
      <div className="flex items-center justify-between lg:justify-end">
        <Link
          href={url}
          className={`w-full relative inline-block text-white lg:text-cardinal-red hocus:text-white lg:hocus:text-black no-underline hocus:underline py-5 ${leftPadding[level]} ` + (activeTrail.includes(id) ? inTrail : "") + (level > 0 ? " lg:pl-5" : " lg:pl-0")}
          aria-current={activeTrail.at(-1) === id ? "true" : undefined}
        >
          {title}
        </Link>

        {items &&
          <>
            {level === 0 && <div className="block ml-5 w-[1px] h-[30px] bg-archway-light shrink-0"/>}
            <button
              className="shrink-0 relative right-10 lg:right-0 text-white lg:text-cardinal-red bg-cardinal-red lg:bg-transparent rounded-full group"
              onClick={() => setSubmenuOpen(!submenuOpen)}
              aria-expanded={submenuOpen}
            >
              <ChevronDownIcon
                height={40}
                className={(submenuOpen ? "rotate-180" : "") + " transition group-hocus:scale-150 ease-in-out duration-150"}
              />
              <span className="sr-only">{submenuOpen ? "Close" : "Open"} {title} Submenu</span>
            </button>

          </>
        }

      </div>

      {items &&
        <ul
          className={(submenuOpen ? "block" : "hidden") + " list-unstyled w-full min-w-[300px] lg:absolute lg:bg-white lg:shadow-2xl px-0 " + (level >= 1 ? "lg:left-full lg:top-0 " : "lg:left-0 lg:top-full ") + zIndexes[level]}>
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
    </OutsideClickHandler>
  )
}
export default MainMenu;