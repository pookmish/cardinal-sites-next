"use client"

import {PropsWithoutRef, useEffect, useState} from "react";

const Email = ({email, ...props}: PropsWithoutRef<{ email: string }>) => {
  const [display, setDisplay] = useState<boolean>(false)
  useEffect(() => setDisplay(true), [])
  return (
    <>
      {display &&
        <a href={`mailto:${email}`} {...props}>
          {email}
        </a>
      }
    </>
  )
}
export default Email