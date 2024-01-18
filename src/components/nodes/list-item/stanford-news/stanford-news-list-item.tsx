import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {Image as ImageType, NodeStanfordNews, TermUnion} from "@lib/gql/__generated__/drupal";
import {getMediaFromEntityField} from "@lib/drupal/get-media-from-entity";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordNews
  headingLevel?: string
}

const StanfordNewsListItem = ({node, headingLevel, ...props}: Props) => {
  const image = getMediaFromEntityField<ImageType>(node.suNewsFeaturedMedia)
  const imageUrl = image?.url;

  const publishDate = node.suNewsPublishingDate && new Date(node.suNewsPublishingDate.time);

  const topics: TermUnion[] = node.suNewsTopics ? node.suNewsTopics.slice(0, 3) : [];
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="@container" {...props}>
      <div className="flex w-full justify-between flex-col @3xl:flex-row py-10">
        <div className="order-2 @3xl::order-1 flex flex-col">

          <Heading className="font-bold text-m2" id={node.id}>
            <Link
              href={node.path}
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
              className="object-cover"
              src={imageUrl}
              alt={image?.alt || ''}
              fill
              sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
            />
          </div>
        }
      </div>
    </article>
  )
}
export default StanfordNewsListItem;