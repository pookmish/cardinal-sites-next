"use client";

import {ElementType, PropsWithChildren, ReactNode} from "react";
import Link from "next/link";
import {EnvelopeIcon} from "@heroicons/react/24/outline";
import ActionLink from "@components/elements/action-link";
import Button from "@components/elements/button";

interface Props {
  href: string
  children: ReactNode | ReactNode[]
  className?: string
}

const DrupalLink = ({href, className, children, ...props}: PropsWithChildren<Props>) => {
  if (!href || href === '') {
    href = '#';
  }

  const drupalBase: string = (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? '').replace(/\/$/, '');

  if (href && !href.includes('/files/')) {
    href = href.replace(drupalBase, '').replace('<front>', '/');
  }

  let afterIcon;

  if (className && className.includes('link--action')) {
    return <ActionLink href={href} {...props}>{children}</ActionLink>
  }

  if (className && className.includes('button')) {
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

  if (href.startsWith('mailto')) afterIcon = <EnvelopeIcon width={20} className="ml-4 inline-block"/>

  const LinkElement: ElementType = href.startsWith('/') ? Link : 'a';
  className = className && className.length > 0 ? className : undefined;

  return (
    <LinkElement href={href} className={className} {...props}>
      {children}
      {afterIcon}
    </LinkElement>
  )
}
export default DrupalLink as typeof Link;