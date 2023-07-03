"use client";

import {PropsWithChildren, ReactNode} from "react";
import Link from "next/link";
import {EnvelopeIcon} from "@heroicons/react/24/outline";
import ActionLink from "@components/elements/action-link";
import Button from "@components/elements/button";
import {LinkProps} from "next/dist/client/link";

interface Props extends LinkProps {
  href: string
  children: ReactNode | ReactNode[]
  className?: string
}

const DrupalLink = ({href, className, prefetch = true, children, ...props}: PropsWithChildren<Props>) => {
  if (!href || href === '') {
    href = '#';
  }

  const drupalBase: string = (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? '').replace(/\/$/, '');

  if (href && !href.includes('/files/')) {
    href = href.replace(drupalBase, '').replace('<front>', '/');
  }
  className = className && className.length > 0 ? className : undefined;


  if (className) {
    if (className.includes('link--action')) {
      return <ActionLink href={href} {...props}>{children}</ActionLink>
    }

    if (className.includes('button')) {
      return (
        <Button
          href={href}
          big={className.includes('--big')}
          secondary={className.includes('--secondary')}
          {...props}
        >
          {children}
        </Button>
      )
    }
  }

  let afterIcon;
  if (href.startsWith('mailto')) afterIcon = <EnvelopeIcon width={20} className="ml-4 inline-block"/>

  return (
    <Link href={href} className={className} prefetch={prefetch && href.startsWith('/')} {...props}>
      {children}
      {afterIcon}
    </Link>
  )
}
export default DrupalLink as typeof Link;