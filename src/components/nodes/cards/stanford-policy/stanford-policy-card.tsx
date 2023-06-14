import Link from "@/components/elements/link";
import {PolicyNodeType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import {H2, H3} from "@/components/elements/headers";

const StanfordPolicyCard = ({node, headingLevel}: { node: PolicyNodeType, headingLevel?: string }) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  const teaserSummary = node.body?.summary || node.body?.processed?.replace(/(<([^>]+)>)/ig, ' ')?.split(" ").slice(0, 50).join(" ") + '...';
  return (
    <div
      className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10 overflow-hidden">

      <Heading className="text-m2">
        <Link href={node.path?.alias} className="text-digital-red no-underline hocus:text-black hocus:underline">
          {node.title}
        </Link>
      </Heading>

      {teaserSummary &&
        <Wysiwyg html={teaserSummary}/>
      }
    </div>
  )
}
export default StanfordPolicyCard;