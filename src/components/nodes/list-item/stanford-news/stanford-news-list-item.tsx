import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NewsNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NewsNodeType
  headingLevel?: string
}

const StanfordNewsListItem = ({node, headingLevel, ...props}: Props) => {
  const image = node.su_news_featured_media?.field_media_image
  const imageUrl = image?.url;
  const imageAlt = image?.alt || '';

  const publishDate = node.suNewsPublishingDate && new Date(node.suNewsPublishingDate.time);

  const topics= node.su_news_topics ? node.su_news_topics.slice(0, 3) : [];
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="@container" {...props}>
      <div className="flex w-full justify-between flex-col @3xl:flex-row py-10">
        <div className="order-2 @3xl::order-1 flex flex-col">

          <Heading className="font-bold text-m2" id={node.id}>
            <Link
              href={node.path.alias}
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
    </article>
  )
}
export default StanfordNewsListItem;