import {redirect} from "next/navigation";
import Image from "next/image";
import Rows from "@components/paragraphs/rows/rows";
import SocialIcons from "@components/nodes/pages/stanford-news/social-icons";
import {H1} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeStanfordNews} from "@lib/gql/__generated__/drupal";
import {isDraftMode} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordNews
  headingLevel?: "h2" | "h3"
}

const StanfordNewsPage = ({node, ...props}: Props) => {
  if (node.suNewsSource?.url && !isDraftMode()) redirect(node.suNewsSource.url)

  const publishDate = node.suNewsPublishingDate ? new Date(node.suNewsPublishingDate.time).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: node.suNewsPublishingDate.timezone
  }) : undefined;

  let bannerImageUrl: string | undefined, bannerImageAlt: string = ""
  if (node.suNewsBanner?.__typename === 'MediaImage') {
    bannerImageUrl = node.suNewsBanner.mediaImage.url
    bannerImageAlt = node.suNewsBanner.mediaImage.alt || "";
  }

  const topics = node.suNewsTopics?.slice(0, 3);

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

        {node.suNewsDek && <div className="mb-10">{node.suNewsDek}</div>}

        <div className="flex gap-5 items-center">
          {node.suNewsPublishingDate &&
            <time dateTime={new Date(node.suNewsPublishingDate.time).toISOString().substring(0, 10)}>
              {publishDate}
            </time>
          }
          {node.suNewsByline && <div>{node.suNewsByline}</div>}

          {!node.suNewsHideSocial &&
            <SocialIcons className="flex gap-4"/>
          }
        </div>
      </div>

      {bannerImageUrl &&
        <figure className="mb-32">
          <div className="relative w-full aspect-[16/9]">
            <Image
              className="object-cover"
              src={bannerImageUrl}
              alt={bannerImageAlt}
              loading="eager"
              fill
              sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
            />
          </div>
          {node.suNewsBannerMediaCaption &&
            <figcaption className="text-center px-20">
              {node.suNewsBannerMediaCaption}
            </figcaption>
          }
        </figure>
      }

      {node.suNewsComponents &&
        <Rows components={node.suNewsComponents}/>
      }

    </article>
  )
}
export default StanfordNewsPage;