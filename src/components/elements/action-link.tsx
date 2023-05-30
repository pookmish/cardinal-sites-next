import Link from "@/components/elements/link";
import {ArrowUpRightIcon} from "@heroicons/react/20/solid";
import {PropsWithChildren} from "react";

interface Props {
  href: string;
}

const ActionLink = ({href, children, ...props}: PropsWithChildren<Props>) => {
  return (
    <Link href={href} {...props} className="relative">
      {children}
      <ArrowUpRightIcon height={25} className="ml-2 inline-block"/>
    </Link>
  )
}
export default ActionLink;