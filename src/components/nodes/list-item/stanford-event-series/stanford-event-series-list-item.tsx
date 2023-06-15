import Link from "@components/elements/link";
import {EventSeriesNodeType} from "@lib/types";
import {H2, H3} from "@components/elements/headers";

const StanfordEventSeriesListItem = ({node, headingLevel}: { node: EventSeriesNodeType, headingLevel?: string }) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10">

      <Heading className=" text-m2">
        <Link href={node.path?.alias} className="text-black no-underline hocus:text-black hocus:underline">
          {node.title}
        </Link>
      </Heading>
    </div>
  )
}
export default StanfordEventSeriesListItem;