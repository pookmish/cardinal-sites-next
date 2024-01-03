import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {EventSeriesNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: EventSeriesNodeType
  headingLevel?: string
}

const StanfordEventSeriesListItem = ({node, headingLevel, ...props}: Props) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10" {...props}>

      <Heading className="text-m2" id={node.id}>
        <Link href={node.path.alias}>
          {node.title}
        </Link>
      </Heading>
    </article>
  )
}
export default StanfordEventSeriesListItem;