"use client";

import {JSX, PropsWithoutRef, RefObject, useLayoutEffect, useRef, useState} from "react";
import Button from "@components/elements/button";

const PagedList = ({children, itemProps, itemsPerPage = 20}: {
  children: JSX.Element[],
  itemProps?: PropsWithoutRef<any>,
  itemsPerPage?: number
}) => {
  const [shownItems, setShownItems] = useState(itemsPerPage)
  const [allowFocus, setAllowFocus] = useState(false);
  const ref: RefObject<HTMLLIElement> = useRef(null);

  const showMoreItems = () => {
    setAllowFocus(true);
    setShownItems(shownItems + itemsPerPage);
  }

  useLayoutEffect(() => {
    ref.current?.focus();
  }, [shownItems]);

  const focusingItem = shownItems - itemsPerPage;

  return (
    <>
      {children.slice(0, shownItems).map((item, i) =>
        <li
          key={i}
          ref={focusingItem === i ? ref : null}
          tabIndex={focusingItem === i && allowFocus ? 0 : undefined}
          onBlur={() => setAllowFocus(false)}
          {...itemProps}
        >
          {item}
        </li>
      )}

      {children.length > shownItems &&
        <Button centered onClick={showMoreItems}>
          Load More
        </Button>
      }
    </>
  )
}
export default PagedList