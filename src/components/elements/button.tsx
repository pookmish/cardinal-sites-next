import Link from "@/components/elements/link";
import {PropsWithChildren} from "react";
import {twMerge} from 'tailwind-merge'

interface Props {
  href: string
  centered?: boolean
  className?: string
}

export const Button = ({href, centered = false, children, className = "", ...props}: PropsWithChildren<Props>) => {
  const centeredClass = centered ? " mx-auto block w-fit" : " inline-block"
  return (
    <Link
      href={href}
      {...props}
      className={twMerge(`bg-digital-red text-white hocus:bg-black hocus:text-white px-10 py-5 no-underline hocus:underline transition ${centeredClass}`.trim(), className)}
    >
      {children}
    </Link>
  )
}
export default Button