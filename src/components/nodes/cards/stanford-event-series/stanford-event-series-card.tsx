import Link from "@components/elements/link";
import {EventSeriesNodeType} from "@lib/types";
import {H2, H3} from "@components/elements/headers";
import {PropsWithoutRef} from "react";

const StanfordEventSeriesCard = ({node, headingLevel, ...props}: PropsWithoutRef<{ node: EventSeriesNodeType, headingLevel?: string }>) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="mx-auto shadow-xl border border-black-20 p-10 overflow-hidden" {...props}>
      <Heading className="text-m2 [&_a]:text-black [&_a]:hocus:text-digital-red">
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