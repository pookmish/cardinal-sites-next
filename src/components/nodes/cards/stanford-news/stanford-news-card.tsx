import {NewsNodeType} from "@/lib/types";
import Image from "next/image";
import Link from "@/components/elements/link";

const StanfordNewsCard = ({node}: { node: NewsNodeType }) => {
  const imageUrl = node.su_news_featured_media?.field_media_image?.image_style_uri.card_1900x950;
  const imageAlt = node.su_news_featured_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  return (
    <div className="max-w-[500px] mx-auto shadow-lg">

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
        <Link href={node.path}
              className="text-black no-underline hocus:text-black hocus:underline">
          <h3 className="text-m2">{node.title}</h3>
        </Link>
        {node.su_news_topics &&
          <div>
            {node.su_news_topics.slice(0, 3).map((topic, index) =>
              <span key={topic.id}>{topic.name}{(index != 2 && index != node.su_news_topics.length) ? ", " :""}</span>
            )}
          </div>
        }

      </div>
    </div>
  )
}
export default StanfordNewsCard;