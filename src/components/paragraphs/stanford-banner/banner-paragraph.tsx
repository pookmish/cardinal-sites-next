import {BannerParagraphType} from "@/lib/types";
import Image from "next/image";
import Wysiwyg from "@/components/elements/wysiwyg";
import Button from "@/components/elements/button";
import React from "react";

type Props = {
  paragraph: BannerParagraphType
}

const BannerParagraph: React.FC<Props> = ({paragraph}) => {
  const hasCard = paragraph.su_banner_header || paragraph.su_banner_button || paragraph.su_banner_body
  const imageUrl = paragraph.su_banner_image?.field_media_image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = paragraph.su_banner_image?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = paragraph.su_banner_image?.field_media_image?.uri.base64

  return (
    <div className="@container relative min-h-[520px]">
      <div
        className="relative @6xl:absolute w-full @6xl:h-full min-h-[320px] bg-cool-grey">
        {imageUrl &&
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            placeholder={placeholder ? 'blur': 'empty'}
            blurDataURL={placeholder}
          />
        }
      </div>

      {hasCard &&
        <div
          className="w-full relative shadow-lg flex flex-col gap-10 py-20 px-10 @6xl:bg-white @6xl:max-w-[450px] @6xl:my-20 @6xl:ml-20 @6xl:z-10">

          {paragraph.su_banner_header &&
            <h2 className="order-2 text-m2 p-0 m-0">
              {paragraph.su_banner_header}
            </h2>
          }
          {paragraph.su_banner_sup_header &&
            <div className="order-1 font-semibold">
              {paragraph.su_banner_sup_header}
            </div>
          }

          {paragraph.su_banner_body &&
            <Wysiwyg html={paragraph.su_banner_body} className="order-3"/>
          }

          {paragraph.su_banner_button &&
            <div className="order-4">
              <Button href={paragraph.su_banner_button.url}>
                {paragraph.su_banner_button.title}
              </Button>
            </div>
          }
        </div>
      }

    </div>
  )
}
export default BannerParagraph