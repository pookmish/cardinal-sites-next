import Link from "@/components/elements/link";
import {PolicyNodeType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";

const StanfordPolicyCard = ({node}: { node: PolicyNodeType }) => {

  const teaserSummary = node.body?.summary || node.body?.processed?.replace(/(<([^>]+)>)/ig, ' ')?.split(" ").slice(0, 50).join(" ") + '...';
  return (
    <div
      className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10 overflow-hidden">
      <Link href={node.path}
            className="text-digital-red no-underline hocus:text-black hocus:underline">
        <h3 className=" text-m2">{node.title}</h3>
      </Link>

      {teaserSummary &&
        <Wysiwyg html={teaserSummary}/>
      }
    </div>
  )
}
export default StanfordPolicyCard;