"use client"

import {PropsWithoutRef, useEffect, useState} from "react";

const Telephone = ({tel, ...props}: PropsWithoutRef<{ tel: string }>) => {
  const [display, setDisplay] = useState<boolean>(false)
  useEffect(() => setDisplay(true), [])
  return (
    <>
      {display &&
        <a href={`tel:${tel.replace(/[^\d]+/g, '')}`} {...props}>
          {tel}
        </a>
      }
    </>
  )
}
export default Telephone