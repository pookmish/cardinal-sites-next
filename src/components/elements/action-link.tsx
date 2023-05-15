import Link from "@/components/elements/link";
import {ArrowUpRightIcon} from "@heroicons/react/20/solid";

const ActionLink = ({href, children, ...props}) => {
  return (
    <Link href={href} {...props} className="relative">
      {children}
      <ArrowUpRightIcon height={25} className="ml-2 inline-block"/>
    </Link>
  )
}
export default ActionLink;