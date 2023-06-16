import Link from "@components/elements/link";
import {PublicationNodeType} from "@lib/types";
import {H2, H3} from "@components/elements/headers";

const StanfordPublicationListItem = ({node, headingLevel}: { node: PublicationNodeType, headingLevel?: string }) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10">
      <div className="flex flex-col">
        <Heading className="text-m2 order-first">
          <Link href={node.path?.alias} >
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
    </div>
  )
}
export default StanfordPublicationListItem;