import {useCallback, useEffect, useRef} from "react";

const useOutsideClick = (onClickOutside: (_e: Event) => void) => {

  const clickCaptured = useRef(false)
  const focusCaptured = useRef(false)

  const documentClick = useCallback((event: Event) => {
    if (!clickCaptured.current && onClickOutside) {
      onClickOutside(event);
    }
    clickCaptured.current = false;
  }, [onClickOutside])

  const documentFocus = useCallback((event: Event) => {
    if (!focusCaptured.current && onClickOutside) {
      onClickOutside(event);
    }
    focusCaptured.current = false;
  }, [onClickOutside])

  useEffect(() => {
    document.addEventListener("mousedown", documentClick);
    document.addEventListener("focusin", documentFocus);
    document.addEventListener("touchstart", documentClick);
    return () => {
      document.removeEventListener("mousedown", documentClick);
      document.removeEventListener("focusin", documentFocus);
      document.removeEventListener("touchstart", documentClick);
    }
  }, [documentClick, documentFocus])
  return {
    onMouseDown: () => clickCaptured.current = true,
    onFocus: () => focusCaptured.current = true,
    onTouchStart: () => clickCaptured.current = true
  }
}

export default useOutsideClick;