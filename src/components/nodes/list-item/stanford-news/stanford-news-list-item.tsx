import {NewsNodeType} from "@/lib/types";
import Image from "next/image";
import Link from "@/components/elements/link";
import {DrupalTaxonomyTerm} from "next-drupal";
import {H2, H3} from "@/components/elements/headers";

const StanfordNewsListItem = ({node, headingLevel}: { node: NewsNodeType, headingLevel?: string }) => {
  const imageUrl = node.su_news_featured_media?.field_media_image?.image_style_uri.card_1900x950;
  const imageAlt = node.su_news_featured_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const publishDate = node.su_news_publishing_date ? new Date(node.su_news_publishing_date) : null;

  const topics: DrupalTaxonomyTerm[] | undefined = (node.su_news_topics && node.su_news_topics.length > 0) ? node.su_news_topics.slice(0, 3) : undefined;
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="@container">
      <div className="flex w-full justify-between flex-col @3xl:flex-row py-10">
        <div className="order-2 @3xl::order-1 flex flex-col">

          <Heading className="font-bold text-m2">
            <Link
              href={node.path?.alias}
              className="text-digital-red no-underline hocus:text-black hocus:underline order-2"
            >
              {node.title}
            </Link>
          </Heading>

          {publishDate &&
            <div className="order-1 mb-10">
              {publishDate.toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})}
            </div>
          }

          {topics &&
            <div className="order-3">
              {topics.map((topic, index) =>
                <span key={topic.id}>
                  {topic.name}{(index != 2 && index != topics.length - 1) ? ", " : ""}
                </span>
              )}
            </div>
          }
        </div>

        {imageUrl &&
          <div className="order-1 @3xl:order-2 relative aspect-[16/9] @3xl:w-1/4 mb-10 @3xl:mb-0 shrink-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        }
      </div>
    </div>
  )
}
export default StanfordNewsListItem;