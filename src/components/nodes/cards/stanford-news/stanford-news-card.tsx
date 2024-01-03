import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeStanfordNews, TermUnion, Image as ImageType} from "@lib/gql/__generated__/drupal";
import {getMediaFromEntityField} from "@lib/drupal/get-media-from-entity";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordNews
  headingLevel?: string
}

const StanfordNewsCard = ({node, headingLevel, ...props}: Props) => {
  const image = getMediaFromEntityField<ImageType>(node.suNewsFeaturedMedia)
  const imageUrl = image?.url;
  const imageAlt = image?.alt || '';

  const topics: TermUnion[] = node.suNewsTopics ? node.suNewsTopics.slice(0, 3) : [];
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 overflow-hidden" {...props}>

      {imageUrl &&
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      }
      <div className="p-20">

        <Heading className="text-m2 [&_a]:text-black" id={node.id}>
          <Link href={node.path}>
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