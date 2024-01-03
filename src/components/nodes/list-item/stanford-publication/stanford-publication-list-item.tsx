import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {PublicationNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: PublicationNodeType
  headingLevel?: string
}

const StanfordPublicationListItem = ({node, headingLevel, ...props}: Props) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10" {...props}>
      <div className="flex flex-col">
        <Heading className="text-m2 order-first" id={node.id}>
          <Link href={node.path.alias}>
            {node.title}
          </Link>
        </Heading>
        <div className="font-bold">
          Publication
        </div>
      </div>

      {node.su_publication_topics &&
        <div>
          {node.su_publication_topics.map(topic =>
            <div key={topic.id}>{topic.name}</div>
          )}
        </div>
      }
    </article>
  )
}
export default StanfordPublicationListItem;