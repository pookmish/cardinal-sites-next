"use client";

import {useCallback, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import ReactFocusLock from "react-focus-lock";
import {XMarkIcon} from "@heroicons/react/20/solid";

const InterceptionModal = ({children}) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.getElementsByTagName('body')[0].style.height = '100vh';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.getElementsByTagName('body')[0].style.height = 'auto';
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  }, [onKeyDown]);

  return (
      <dialog
        ref={overlay}
        className="modal fixed w-screen h-full overscroll-contain overflow-y-scroll overflow-x-hidden top-0 left-0 items-center justify-center z-[10000] bg-black-true bg-opacity-[90%] flex"
        onClick={onClick}
      >
        <ReactFocusLock returnFocus>
          <div
            ref={wrapper}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
          >
            {children}
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="fixed right-60 top-60 text-white flex hocus:underline"
          >
            Close<span className="sr-only"> Overlay</span>
            <XMarkIcon className="ml-5" width={25}/>
          </button>
        </ReactFocusLock>
      </dialog>

  );
}


export default InterceptionModal;