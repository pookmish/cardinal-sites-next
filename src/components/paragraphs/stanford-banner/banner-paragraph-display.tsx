import Image from "next/image";
import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";
import React from "react";
import {H2} from "@components/elements/headers";
import {Maybe, Link as LinkType} from "@lib/gql/__generated__/drupal";

type Props = {
  imageUrl?: Maybe<string>
  imageAlt?: Maybe<string>
  imageLoading?: 'lazy' | 'eager'

  header?: Maybe<string>
  supHeader?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
}

const BannerParagraphDisplay = ({imageUrl, imageAlt, imageLoading, header, supHeader, body, link}: Props) => {
  const hasCard = header || link || body || supHeader

  return (
    <div className="@container md:min-h-[400px] mb-20">
      <div
        className="aspect-[16/9] @6xl:aspect-auto relative @6xl:absolute w-full @6xl:h-full bg-cool-grey">
        {imageUrl &&
          <Image
            className="object-cover"
            src={imageUrl}
            alt={imageAlt || ""}
            loading={imageLoading || 'lazy'}
            fill
            sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
          />
        }
      </div>

      {hasCard &&
        <div
          className="w-full relative shadow-lg flex flex-col gap-10 py-20 px-10 @6xl:bg-white @6xl:max-w-[550px] @6xl:my-20 @6xl:ml-20 @6xl:z-10">

          {header &&
            <H2 className="order-2 text-m2 p-0 m-0">
              {header}
            </H2>
          }
          {supHeader &&
            <div className="order-1 font-semibold">
              {supHeader}
            </div>
          }

          {body &&
            <Wysiwyg html={body} className="order-3"/>
          }

          {link?.url &&
            <div className="order-4">
              <Button href={link.url}>
                {link.title}
              </Button>
            </div>
          }
        </div>
      }

    </div>
  )
}
export default BannerParagraphDisplay