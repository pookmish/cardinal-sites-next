import {redirect} from "next/navigation";
import Image from "next/image";
import Rows from "@components/paragraphs/rows/rows";
import SocialIcons from "@components/nodes/pages/stanford-news/social-icons";
import {H1} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NewsNodeType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NewsNodeType
  headingLevel?: string
}

const StanfordNewsPage = ({node, ...props}: Props) => {
  if (node.su_news_source?.url) redirect(node.su_news_source.url)

  const publishDate = node.su_news_publishing_date ? new Date(node.su_news_publishing_date).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : undefined;

  let bannerImageUrl: string | undefined, bannerImageAlt: string = ""
  if (node.su_news_banner?.type === 'media--image') {
    bannerImageUrl = node.su_news_banner.field_media_image?.uri.url
    bannerImageAlt = node.su_news_banner.field_media_image?.resourceIdObjMeta?.alt || "";
  }

  const topics = node.su_news_topics?.slice(0, 3);

  return (
    <article className="centered mt-32" {...props}>
      <div className="lg:w-3/4 mx-auto mb-20">
        <div className="flex flex-col">
          <H1 className="order-2">
            {node.title}
          </H1>

          {topics &&
            <div className="order-1 flex gap-2">
              {topics.map((topic, i) =>
                <div key={topic.id}>
                  {topic.name}
                  {i != 2 && i != topics.length - 1 ? ',' : ''}
                </div>
              )}
            </div>
          }
        </div>

        {node.su_news_dek && <div className="mb-10">{node.su_news_dek}</div>}

        <div className="flex gap-5 items-center">
          {node.su_news_publishing_date &&
            <time dateTime={new Date(node.su_news_publishing_date).toISOString().substring(0, 10)}>
              {publishDate}
            </time>
          }
          {node.su_news_byline && <div>{node.su_news_byline}</div>}

          {!node.su_news_hide_social &&
            <SocialIcons className="flex gap-4"/>
          }
        </div>
      </div>

      {bannerImageUrl &&
        <figure className="mb-32">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={buildUrl(bannerImageUrl).toString()}
              alt={bannerImageAlt}
              fill
              className="object-cover"
            />
          </div>
          {node.su_news_banner_media_caption &&
            <figcaption className="text-center px-20">
              {node.su_news_banner_media_caption}
            </figcaption>
          }
        </figure>
      }

      {node.su_news_components &&
        <Rows components={node.su_news_components}/>
      }

    </article>
  )
}
export default StanfordNewsPage;