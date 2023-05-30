import {NewsNodeType} from "@/lib/types";
import Image from "next/image";
import Link from "@/components/elements/link";
import {DrupalTaxonomyTerm} from "next-drupal";

const StanfordNewsCard = ({node}: { node: NewsNodeType }) => {
  const imageUrl = node.su_news_featured_media?.field_media_image?.image_style_uri.card_1900x950;
  const imageAlt = node.su_news_featured_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';

  const topics: DrupalTaxonomyTerm[] | undefined = (node.su_news_topics && node.su_news_topics.length > 0) ? node.su_news_topics.slice(0, 3) : undefined;

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
        <Link href={node.path?.alias}
              className="text-black no-underline hocus:text-black hocus:underline">
          <h3 className="text-m2">{node.title}</h3>
        </Link>
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