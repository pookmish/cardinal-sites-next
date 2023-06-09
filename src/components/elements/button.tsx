import Link from "@/components/elements/link";
import {PropsWithChildren} from "react";
import {twMerge} from 'tailwind-merge'

interface Props {
  href?: string
  buttonElem?: boolean
  big?: boolean
  secondary?: boolean
  centered?: boolean
  className?: string
}

export const Button = ({href = '#', buttonElem = false, big = false, secondary = false, centered = false, children, className = "", ...props}: PropsWithChildren<Props>) => {

  className = twMerge(className, centered ? " mx-auto block w-fit" : " inline-block")

  if (big) {
    className = twMerge(`transition text-5xl text-white hocus:text-white bg-digital-red hocus:bg-black no-underline hocus:underline py-6 px-12 font-normal`, className)
  } else if (secondary) {
    className = twMerge(`transition text-digital-red border-2 border-digital-red hocus:border-black no-underline hocus:underline py-4 px-8 font-normal`, className)
  } else {
    className = twMerge(`bg-digital-red text-white hocus:bg-black hocus:text-white py-4 px-8 no-underline hocus:underline transition`, className)
  }

  if (buttonElem) {
    return (
      <button
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
  return (
    <Link
      href={href}
      {...props}
      className={className}
    >
      {children}
    </Link>
  )
}

export default Button