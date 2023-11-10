"use client"

import {PropsWithoutRef} from "react";
import {useIsClient} from "usehooks-ts";

const Telephone = ({tel, ...props}: PropsWithoutRef<{ tel: string }>) => {
  const isClient = useIsClient();
  return (
    <>
      {isClient &&
        <a href={`tel:${tel.replace(/[^\d]+/g, '')}`} {...props}>
          {tel}
        </a>
      }
    </>
  )
}
export default Telephone