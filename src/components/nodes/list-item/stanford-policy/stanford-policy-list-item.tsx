import Link from "@components/elements/link";
import {PolicyNodeType} from "@lib/types";
import {H2, H3} from "@components/elements/headers";
import {PropsWithoutRef} from "react";

const StanfordPolicyListItem = ({node, headingLevel, ...props}: PropsWithoutRef<{ node: PolicyNodeType, headingLevel?: string }>) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div
      className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10" {...props}>

      <Heading className="text-m2">
        <Link href={node.path?.alias}>
          {node.title}
        </Link>
      </Heading>
    </div>
  )
}
export default StanfordPolicyListItem;