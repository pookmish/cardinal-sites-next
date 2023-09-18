import Link from "@components/elements/link";
import {twMerge} from 'tailwind-merge'
import {JSX, MouseEventHandler, PropsWithChildren} from "react";

export interface ButtonProps {
  href?: string
  buttonElem?: boolean
  big?: boolean
  secondary?: boolean
  centered?: boolean
  className?: string
  onClick?: MouseEventHandler
  prefetch?: boolean
}

export const Button = ({href, buttonElem = false, big = false, secondary = false, centered = false, children, className = "", ...props}: PropsWithChildren<ButtonProps>):JSX.Element => {

  className = twMerge(className, (centered ? "flex items-center w-fit mx-auto" : "inline-block text-center w-fit"))

  if (big) {
    // Big button styles.
    className = twMerge(`btn btn--big transition text-5xl text-white hocus:text-white bg-digital-red hocus:bg-black no-underline hocus:underline py-6 px-12 font-normal`, className)
  } else if (secondary) {
    // Secondary button styles.
    className = twMerge(`btn btn--secondary transition text-digital-red border-2 border-digital-red hocus:border-black no-underline hocus:underline py-4 px-8 font-normal`, className)
  } else {
    // Regular button styles.
    className = twMerge(`btn bg-digital-red text-white hocus:bg-black hocus:text-white py-4 px-8 no-underline hocus:underline transition`, className)
  }

  if (!href || buttonElem) {
    return (
      <button
        className={className}
        type="button"
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      href={href}
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}

export default Button