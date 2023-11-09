import {NewsNodeType} from "@lib/types";
import Image from "next/image";
import Link from "@components/elements/link";
import {DrupalTaxonomyTerm} from "@lib/types";
import {H2, H3} from "@components/elements/headers";

const StanfordNewsCard = ({node, headingLevel}: { node: NewsNodeType, headingLevel?: string }) => {
  const imageUrl = node.su_news_featured_media?.field_media_image?.image_style_uri.card_1900x950;
  const imageAlt = node.su_news_featured_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';

  const topics: DrupalTaxonomyTerm[] = (node.su_news_topics && node.su_news_topics.length > 0) ? node.su_news_topics.slice(0, 3) : [];
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 overflow-hidden">

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

        <Heading className="text-m2 [&_a]:text-black">
          <Link href={node.path?.alias} >
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
    </div>
  )
}
export default StanfordNewsCard;