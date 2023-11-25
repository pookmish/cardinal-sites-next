"use client";

import {JSX, ComponentProps, RefObject, useLayoutEffect, useRef, useState, PropsWithChildren} from "react";
import Button from "@components/elements/button";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const LoadMoreList = ({buttonText, children, listProps, itemProps, itemsPerPage = 20, ...props}: PropsWithChildren<{
  buttonText?: string | JSX.Element
  children: JSX.Element[],
  listProps?: ComponentProps<any>
  itemProps?: ComponentProps<any>,
  itemsPerPage?: number
}>) => {
  const [shownItems, setShownItems] = useState<number>(itemsPerPage)
  const [allowFocus, setAllowFocus] = useState<boolean>(false);
  const ref: RefObject<HTMLLIElement> = useRef<HTMLLIElement | null>(null);
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