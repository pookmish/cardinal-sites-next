import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NewsNodeType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NewsNodeType
  headingLevel?: string
}

const StanfordNewsCard = ({node, headingLevel, ...props}: Props) => {
  const imageUrl = node.su_news_featured_media?.field_media_image?.uri.url
  const imageAlt = node.su_news_featured_media?.field_media_image?.resourceIdObjMeta?.alt || '';

  const topics = node.su_news_topics ? node.su_news_topics.slice(0, 3) : [];
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 overflow-hidden" {...props}>

      {imageUrl &&
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      }
      <div className="p-20">

        <Heading className="text-m2 [&_a]:text-black" id={node.id}>
          <Link href={node.path.alias}>
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