import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {EventSeriesNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: EventSeriesNodeType
  headingLevel?: string
}

const StanfordEventSeriesCard = ({node, headingLevel, ...props}: Props) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 p-10 overflow-hidden" {...props}>
      <Heading className="text-m2 [&_a]:text-black [&_a]:hocus:text-digital-red" id={node.id}>
        <Link href={node.path.alias}>
          {node.title}
        </Link>
      </Heading>
      {node.su_event_series_dek &&
        <p>{node.su_event_series_dek}</p>
      }
    </article>
  )
}
export default StanfordEventSeriesCard;