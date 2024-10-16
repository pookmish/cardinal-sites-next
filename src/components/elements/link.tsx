import {HtmlHTMLAttributes} from "react"
import Link from "next/link"
import {EnvelopeIcon} from "@heroicons/react/24/outline"
import ActionLink from "@components/elements/action-link"
import Button from "@components/elements/button"
import {LinkProps as NextLinkProps} from "next/dist/client/link"

export type LinkProps = HtmlHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> &
  NextLinkProps & {
    /**
     * Link URL.
     */
    href: string
  }

const DrupalLink = ({href, className, children, ...props}: LinkProps) => {
  // Make sure all links have a href.
  href = href || "#"
  const drupalBase: string = (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || "").replace(/\/$/, "")

  // Make sure links to documents or images go to the Drupal origin.
  if (href.startsWith("/") && href.includes("/files/")) {
    href = `${drupalBase}${href}`
  }

  // For links not to the file system, make them relative and replace <front>.
  if (!href.includes("/files/")) {
    href = href.replace(drupalBase, "").replace("<front>", "/")
  }

  if (className?.includes("link--action")) {
    return (
      <ActionLink href={href} {...props}>
        {children}
      </ActionLink>
    )
  }

  if (className?.includes("button")) {
    return (
      <Button href={href} big={className.includes("--big")} secondary={className.includes("--secondary")} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
      {href.startsWith("mailto") && <EnvelopeIcon width={20} className="ml-4 inline-block" />}
    </Link>
  )
}

export default DrupalLink as typeof Link
