import Link from "@components/elements/link";
import {PublicationNodeType} from "@lib/types";
import {H2, H3} from "@components/elements/headers";

const StanfordPublicationCard = ({node, headingLevel}: { node: PublicationNodeType, headingLevel?: string }) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div
      className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10 overflow-hidden">

      <Heading className=" text-m2">
        <Link href={node.path?.alias} className="text-black no-underline hocus:text-black hocus:underline">
          {node.title}
        </Link>
      </Heading>
    </div>
  )
}
export default StanfordPublicationCard;