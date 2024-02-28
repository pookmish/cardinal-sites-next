import React, {HtmlHTMLAttributes} from "react";
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal.d";
import Image from "next/image";
import {H2} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
  eagerLoadImage?: boolean
}

const BannerParagraph = ({paragraph, eagerLoadImage, ...props}: Props) => {
  const hasCard = paragraph.suBannerHeader || paragraph.suBannerButton || paragraph.suBannerBody || paragraph.suBannerSupHeader

  return (
    <div {...props}>
      <div className="@container md:min-h-[400px] mb-20">
        <div
          className="aspect-[16/9] @6xl:aspect-auto relative @6xl:absolute w-full @6xl:h-full bg-cool-grey">
          {paragraph.suBannerImage?.mediaImage.url &&
            <Image
              className="object-cover"
              src={paragraph.suBannerImage.mediaImage.url}
              alt={paragraph.suBannerImage.mediaImage.alt || ""}
              loading={eagerLoadImage ? "eager" : "lazy"}
              fill
              sizes="100vw"
            />
          }
        </div>

        {hasCard &&
          <div
            className="w-full relative shadow-lg flex flex-col gap-10 py-20 px-10 @6xl:bg-white @6xl:max-w-[550px] @6xl:my-20 @6xl:ml-20 @6xl:z-10">

            {paragraph.suBannerHeader &&
              <H2 className="order-2 text-m2 p-0 m-0">
                {paragraph.suBannerHeader}
              </H2>
            }
            {paragraph.suBannerSupHeader &&
              <div className="order-1 font-semibold">
                {paragraph.suBannerSupHeader}
              </div>
            }

            {paragraph.suBannerBody &&
              <Wysiwyg html={paragraph.suBannerBody.processed} className="order-3"/>
            }

            {paragraph.suBannerButton?.url &&
              <div className="order-4">
                <Button href={paragraph.suBannerButton.url}>
                  {paragraph.suBannerButton.title}
                </Button>
              </div>
            }
          </div>
        }

      </div>
    </div>
  )
}
export default BannerParagraph