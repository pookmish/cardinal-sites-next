import Link from "@/components/elements/link";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
}

export const Button = ({href, centered = false, children, ...props}: Props) => {
  return (
    <Link href={href} {...props}
          className={"bg-digital-red hocus:bg-black text-white hocus:text-white px-10 py-5 no-underline hocus:underline transition" + (centered ? " mx-auto block w-fit" : " inline-block")}>
      {children}
    </Link>
  )
}
export default Button