import Link from "@/components/elements/link";
import {PolicyNodeType} from "@/lib/types";

const StanfordPolicyListItem = ({node}: { node: PolicyNodeType }) => {
  return (
    <div
      className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10">
      <Link href={node.path}
            className="text-black no-underline hocus:text-black hocus:underline">
        <h3 className=" text-m2">{node.title}</h3>
      </Link>
    </div>
  )
}
export default StanfordPolicyListItem;