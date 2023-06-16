import Link from "@components/elements/link";
import {EventSeriesNodeType} from "@lib/types";
import {H2, H3} from "@components/elements/headers";

const StanfordEventSeriesCard = ({node, headingLevel}: { node: EventSeriesNodeType, headingLevel?: string }) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10 overflow-hidden">
      <Heading className="text-m2 [&>a]:text-black [&>a]:hocus:text-digital-red">
        <Link href={node.path?.alias} >
          {node.title}
        </Link>
      </Heading>
      {node.su_event_series_dek &&
        <p>{node.su_event_series_dek}</p>
      }
    </div>
  )
}
export default StanfordEventSeriesCard;