"use client";
import {PropsWithChildren} from "react";
import Link from "next/link";
import {EnvelopeIcon} from "@heroicons/react/24/outline";
import {ArrowUpRightIcon} from "@heroicons/react/20/solid";
import ActionLink from "@/components/elements/action-link";
import Button from "@/components/elements/button";

interface Props {
  href: string
  children: React.ReactNode
  className?: string
}

const DrupalLink = ({href, className = '', children, ...props}: PropsWithChildren<Props>) => {
  if (!href || href === '') {
    href = '#';
  }

  const drupalBase: string = (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? '').replace(/\/$/, '');

  if (href && !href.includes('/files/')) {
    href = href.replace(drupalBase, '').replace('<front>', '/');
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }


  let afterIcon;

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

  if (href.startsWith('mailto')) afterIcon = <EnvelopeIcon width={20} className="ml-4 inline-block"/>

  return (
    <Link href={href} className={className} {...props}>
      {children}
      {afterIcon}
    </Link>
  )
}
export default DrupalLink as typeof Link;