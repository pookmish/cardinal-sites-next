import React, {PropsWithChildren, ReactNode, useEffect, useRef} from "react";

interface OutsideClickHandlerProps extends PropsWithChildren<any> {
  onClickOutside: Function
  onFocusOutside?: Function
  children: ReactNode
  className?: string
  component?: React.ElementType
  render?: Function
}

const OutsideClickHandler = ({component = 'div', onClickOutside, onFocusOutside = onClickOutside, children, ...props}: OutsideClickHandlerProps) => {
  const clickCaptured = useRef(false)
  const focusCaptured = useRef(false)
  const Element = component || "div"

  const documentClick = (event: Event) => {
    if (!clickCaptured.current && onClickOutside) {
      onClickOutside(event);
    }
    clickCaptured.current = false;
  }

  const documentFocus = (event: Event) => {
    if (!focusCaptured.current && onFocusOutside) {
      onFocusOutside(event);
    }
    focusCaptured.current = false;
  }

  useEffect(() => {
    document.addEventListener("mousedown", documentClick);
    document.addEventListener("focusin", documentFocus);
    document.addEventListener("touchstart", documentClick);
    return () => {
      document.removeEventListener("mousedown", documentClick);
      document.removeEventListener("focusin", documentFocus);
      document.removeEventListener("touchstart", documentClick);
    }
  }, [])

  return (
    <Element
      onMouseDown={() => clickCaptured.current = true}
      onFocus={() => focusCaptured.current = true}
      onTouchStart={() => clickCaptured.current = true}
      {...props}
    >
      {children}
    </Element>
  )
}
export default OutsideClickHandler
