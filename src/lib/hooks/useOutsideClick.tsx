import {useCallback, useRef} from "react";
import {useEventListener} from "usehooks-ts";

const useOutsideClick = (onClickOutside: (_e: MouseEvent | FocusEvent | TouchEvent) => void) => {

  const clickCaptured = useRef(false)
  const focusCaptured = useRef(false)

  const documentClick = useCallback((event: MouseEvent | TouchEvent | FocusEvent) => {
    if (event.type === 'mousedown' || event.type === 'touchstart') {
      if (!clickCaptured.current && onClickOutside) {
        onClickOutside(event);
      }
      clickCaptured.current = false;
    }

    if (event.type == 'focusin') {
      if (!focusCaptured.current && onClickOutside) {
        onClickOutside(event);
      }
      focusCaptured.current = false;
    }

  }, [onClickOutside])

  useEventListener('mousedown', documentClick);
  useEventListener('touchstart', documentClick);
  useEventListener('focusin', documentClick);

  return {
    onMouseDown: () => clickCaptured.current = true,
    onFocus: () => focusCaptured.current = true,
    onTouchStart: () => clickCaptured.current = true
  }
}

export default useOutsideClick;