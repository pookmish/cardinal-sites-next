"use client";

import {JSX, PropsWithoutRef, RefObject, useLayoutEffect, useRef, useState} from "react";
import Button from "@components/elements/button";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const LoadMoreList = ({buttonText, children, listProps, itemProps, props, itemsPerPage = 20}: {
  children: JSX.Element[],
  listProps?: PropsWithoutRef<any>
  itemProps?: PropsWithoutRef<any>,
  props?: PropsWithoutRef<any>
  itemsPerPage?: number
}) => {
  const [shownItems, setShownItems] = useState(itemsPerPage)
  const [allowFocus, setAllowFocus] = useState(false);
  const ref: RefObject<HTMLLIElement> = useRef(null);
  const [animationParent] = useAutoAnimate();

  const showMoreItems = () => {
    setAllowFocus(true);
    setShownItems(shownItems + itemsPerPage);
  }

  useLayoutEffect(() => ref.current?.focus(), [shownItems]);

  const focusingItem = shownItems - itemsPerPage;

  return (
    <div {...props}>
      <ul {...listProps} ref={animationParent}>
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
      </ul>
      {children.length > shownItems &&
        <Button centered onClick={showMoreItems}>
          {buttonText ? buttonText : "Load More"}
        </Button>
      }
    </div>
  )
}
export default LoadMoreList;