import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeStanfordNews, TermUnion} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordNews
  headingLevel?: string
}

const StanfordNewsCard = ({node, headingLevel, ...props}: Props) => {
  const image = node.suNewsFeaturedMedia?.mediaImage

  const topics: TermUnion[] = node.suNewsTopics ? node.suNewsTopics.slice(0, 3) : [];
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 overflow-hidden" {...props}>

      {image?.url &&
        <div className="relative aspect-[16/9] w-full">
          <Image
            className="object-cover"
            src={image.url}
            alt={image.alt || ''}
            fill
            sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
          />
        </div>
      }
      <div className="p-20">

        <Heading className="text-m2 [&_a]:text-black" id={node.id}>
          <Link href={node.suNewsSource?.url || node.path}>
            {node.title}
          </Link>
        </Heading>

        {topics &&
          <div>
            {topics.map((topic, index) =>
              <span key={topic.id}>{topic.name}{(index != 2 && index != topics.length - 1) ? ", " : ""}</span>
            )}
          </div>
        }

      </div>
    </article>
  )
}
export default StanfordNewsCard;