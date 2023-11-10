"use client"

import {PropsWithoutRef} from "react";
import {useIsClient} from "usehooks-ts";

const Email = ({email, ...props}: PropsWithoutRef<{ email: string }>) => {
  const isClient = useIsClient();
  return (
    <>
      {isClient &&
        <a href={`mailto:${email}`} {...props}>
          {email}
        </a>
      }
    </>
  )
}
export default Email