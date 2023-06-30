import Link from "@components/elements/link";
import {ElementType, PropsWithChildren} from "react";
import {twMerge} from 'tailwind-merge'

export interface ButtonProps {
  href?: string
  buttonElem?: boolean
  big?: boolean
  secondary?: boolean
  centered?: boolean
  className?: string
  onClick?: () => void
}

export const Button = ({href = '#', buttonElem = false, big = false, secondary = false, centered = false, children, className = "", ...props}: PropsWithChildren<ButtonProps>) => {

  className = twMerge(className, (centered ? "flex items-center w-fit mx-auto" : "inline-block text-center w-fit"))

  if (big) {
    // Big button styles.
    className = twMerge(`transition text-5xl text-white hocus:text-white bg-digital-red hocus:bg-black no-underline hocus:underline py-6 px-12 font-normal`, className)
  } else if (secondary) {
    // Secondary button styles.
    className = twMerge(`transition text-digital-red border-2 border-digital-red hocus:border-black no-underline hocus:underline py-4 px-8 font-normal`, className)
  } else {
    // Regular button styles.
    className = twMerge(`bg-digital-red text-white hocus:bg-black hocus:text-white py-4 px-8 no-underline hocus:underline transition`, className)
  }

  if (buttonElem) {
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

  const LinkElement: ElementType = href.startsWith('/') ? Link : 'a';
  return (
    <LinkElement
      href={href}
      className={className}
      {...props}
    >
      {children}
    </LinkElement>
  )
}

export default Button