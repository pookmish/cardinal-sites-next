import {PropsWithChildren} from "react";
import Link from "next/link";
import {EnvelopeIcon} from "@heroicons/react/24/outline";

const DrupalLink = ({href, children, ...props}: PropsWithChildren<{ href: string, children: React.ReactNode }>) => {
  if (!href || href === '') {
    href = '#';
  }

  const drupalBase: string = (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? '').replace(/\/$/, '');

  if (href && !href.includes('/files/')) {
    href = href.replace(drupalBase, '').replace('<front>', '/');
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {children}
      {href.startsWith('mailto') &&
        <EnvelopeIcon width={20} className="ml-4 inline-block"/>
      }
    </Link>
  )
}
export default DrupalLink as Link;