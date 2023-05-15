import {NewsNodeType} from "@/lib/types";
import {redirect} from "next/navigation";
import Image from "next/image";
import Rows from "@/components/paragraphs/rows/rows";
import SocialIcons from "@/components/nodes/pages/stanford-news/social-icons";

const StanfordNewsPage = ({node}: { node: NewsNodeType }) => {
  if(node.su_news_source?.url) redirect(node.su_news_source.url)
  const publishDate = node.su_news_publishing_date ? new Date(node.su_news_publishing_date).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : null;

  const bannerImageUrl = node.su_news_banner?.field_media_image?.image_style_uri?.breakpoint_2xl_2x;
  const bannerImageAlt = node.su_news_banner?.field_media_image?.resourceIdObjMeta?.alt;
  return (
    <div className="cc mt-32">
      <div className="lg:w-3/4 mx-auto mb-20">
        <div className="flex flex-col">
          <h1 className="order-2">{node.title}</h1>
          {node.su_news_topics &&
            <div className="order-1 flex gap-2">
              {node.su_news_topics.slice(0, 3).map((topic, i) =>
                <div key={topic.id}>
                  {topic.name}
                  {i != 2 && i != node.su_news_topics?.length - 1 ? ',' : ''}
                </div>
              )}
            </div>
          }
        </div>

        {node.su_news_dek && <div className="mb-10">{node.su_news_dek}</div>}

        <div className="flex gap-5 items-center">
          {publishDate && <div>{publishDate}</div>}
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
              src={bannerImageUrl}
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

    </div>
  )
}
export default StanfordNewsPage;