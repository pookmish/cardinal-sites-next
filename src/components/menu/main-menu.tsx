"use client";

import Link from "@components/elements/link";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Bars3Icon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {XCircleIcon} from "@heroicons/react/24/outline";
import useNavigationEvent from "@lib/hooks/useNavigationEvent";
import SiteSearchForm from "@components/search/site-search-form";
import useActiveTrail from "@lib/hooks/useActiveTrail";
import useOutsideClick from "@lib/hooks/useOutsideClick";
import {usePathname} from "next/navigation";
import {useBoolean} from "usehooks-ts";
import {DrupalMenuItem} from "@lib/drupal/get-menu";
import {clsx} from "clsx";

const MainMenu = ({menuItems}: { menuItems: DrupalMenuItem[] }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {value: menuOpen, setFalse: closeMenu, toggle: toggleMenu} = useBoolean(false)
  const browserUrl = useNavigationEvent()
  const activeTrail = useActiveTrail(menuItems, usePathname() || '');

  const clickProps = useOutsideClick(closeMenu);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && menuOpen) {
      closeMenu()
      buttonRef.current?.focus();
    }
  }, [menuOpen, closeMenu]);

  useEffect(() => closeMenu(), [browserUrl, closeMenu]);

  useEffect(() => {
    // Add keydown listener for escape button if the submenu is open.
    if (menuOpen) document.addEventListener("keydown", handleEscape);
    if (!menuOpen) document.removeEventListener("keydown", handleEscape);
  }, [menuOpen, handleEscape]);

  return (
    <nav aria-label="Main Navigation" {...clickProps} className="lg:centered">
      <button
        ref={buttonRef}
        className="flex flex-col items-center lg:hidden absolute top-5 right-10 group"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
      >
        {menuOpen && <XCircleIcon height={40}/>}
        {!menuOpen && <Bars3Icon height={40}/>}
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

type MenuItemProps = DrupalMenuItem & {
  activeTrail: string[]
  level?: number
}

const MenuItem = ({id, url, title, activeTrail, items, level = 0}: MenuItemProps) => {
  const sublistRef = useRef<HTMLUListElement | null>(null);
  const [positionRight, setPositionRight] = useState<boolean>(true)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {value: submenuOpen, setFalse: closeSubmenu, toggle: toggleSubmenu} = useBoolean(false)
  const browserUrl = useNavigationEvent()

  const itemProps = useOutsideClick(closeSubmenu);

  // Close the submenu if the url changes.
  useEffect(() => closeSubmenu(), [browserUrl, closeSubmenu]);

  useLayoutEffect(() => {
    // If the right side of the submenu is not visible, set the position to be on the left of the menu item.
    const {x, width} = sublistRef.current?.getBoundingClientRect() || {x: 0, width: 0}
    if (x + width > window.innerWidth) setPositionRight(false);
  }, [submenuOpen])

  // If the user presses escape on the keyboard, close the submenus.
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && submenuOpen) {
      closeSubmenu()
      buttonRef.current?.focus();
    }
  }, [submenuOpen, closeSubmenu]);

  useEffect(() => {
    // Add keydown listener for escape button if the submenu is open.
    if (submenuOpen) document.addEventListener("keydown", handleEscape);
    if (!submenuOpen) document.removeEventListener("keydown", handleEscape);
  }, [submenuOpen, handleEscape]);

  // List out the specific classes so tailwind will include them. Dynamic classes values don't get compiles well.
  const zIndexes = ["z-[1]", "z-[2]", "z-[3]", "z-[4]", "z-[5]"]
  const leftPadding = ['pl-10', 'pl-20', 'pl-28', 'pl-48']

  // The last item in the current trail would be the current item id if the user is on that page.
  const isCurrent = activeTrail.at(-1) === id;
  const inTrail = activeTrail.includes(id) && !isCurrent;

  const linkStyles = clsx(
    'w-full relative inline-block text-white lg:text-cardinal-red hocus:text-white lg:hocus:text-black no-underline hocus:underline py-5 lg:pl-0 border-l-[6px]',
    leftPadding[level],
    // Top menu item styles.
    {
      'lg:border-l-0 lg:border-b-[6px] ml-5 lg:ml-0': level === 0,
      'border-digital-red lg:border-black': level === 0 && isCurrent,
      'border-transparent lg:border-foggy-dark': level === 0 && !isCurrent && inTrail,
      'border-transparent': level === 0 && !isCurrent && !inTrail,
    },
    // Child menu item styles.
    {
      'ml-5 lg:ml-0 lg:pl-5': level !== 0,
      'border-digital-red':  level !== 0 && isCurrent,
      'border-transparent': level !== 0 && !isCurrent
    }
  )

  const subMenuStyles = clsx(
    'list-unstyled w-full min-w-[300px] lg:bg-white lg:shadow-2xl px-0 lg:absolute',
    zIndexes[level],
    {
      'block': submenuOpen,
      'hidden': !submenuOpen,
      'lg:top-full lg:right-0': level === 0,
      'lg:top-0': level !== 0,
      'lg:left-full': level !== 0 && positionRight,
      'lg:right-full': level !== 0 && !positionRight,
    }
  )

  return (
    <li
      {...itemProps}
      className={"m-0 py-2 lg:py-0 relative border-b first:border-t last:border-0 border-cool-grey lg:border-black-20 lg:relative lg:mr-5 last:lg:mr-0 " + (level === 0 ? "lg:border-b-0 first:border-t-0" : "")}
    >
      <div className="flex items-center justify-between lg:justify-end">
        <Link
          href={url}
          className={linkStyles}
          aria-current={isCurrent ? "true" : undefined}
        >
          {title}
        </Link>

        {(items && items.length > 0) &&
          <>
            {level === 0 && <div className="block ml-5 w-[1px] h-[25px] mb-[6px]  bg-archway-light shrink-0"/>}
            <button
              ref={buttonRef}
              className="shrink-0 mb-[6px] relative right-10 lg:right-0 text-white lg:text-cardinal-red bg-cardinal-red lg:bg-transparent rounded-full lg:rounded-none group border-b border-transparent hocus:border-black hocus:bg-white"
              onClick={toggleSubmenu}
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
          ref={sublistRef}
          className={subMenuStyles}
        >
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