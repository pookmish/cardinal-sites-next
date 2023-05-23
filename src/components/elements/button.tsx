import Link from "@/components/elements/link";
import {PropsWithChildren} from "react";

interface Props {
  href: string
  centered?: boolean
}

export const Button = ({href, centered = false, children, className = "", ...props}: PropsWithChildren<Props>) => {
  const centeredClass = centered ? " mx-auto block w-fit" : " inline-block"
  return (
    <Link
      href={href}
      {...props}
      className={`${className} bg-digital-red text-white hocus:bg-black hocus:text-white px-10 py-5 no-underline hocus:underline transition ${centeredClass}`.trim()}
    >
      {children}
    </Link>
  )
}
export default Button