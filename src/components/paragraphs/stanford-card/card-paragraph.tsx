import {CardParagraphType} from "@/lib/types";
import Image from "next/image";
import Wysiwyg from "@/components/elements/wysiwyg";
import Button from "@/components/elements/button";
import Oembed from "@/components/elements/ombed";
import ActionLink from "@/components/elements/action-link";

const CardParagraph = ({paragraph}: { paragraph: CardParagraphType }) => {
  const imageUrl = paragraph.su_card_media?.field_media_image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = paragraph.su_card_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const videoUrl = paragraph.su_card_media?.field_media_oembed_video;
  const linkStyle = paragraph.behavior_settings?.su_card_styles?.link_style;
  const placeholder = paragraph.su_card_media?.field_media_image?.uri.base64;

  return (
    <div
      className="cc lg:max-w-[980px] shadow-lg border border-black-10">
      {imageUrl &&
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }

      {videoUrl &&
        <Oembed url={videoUrl}/>
      }

      <div className="py-20 px-10 lg:px-20 flex flex-col gap-5">
        {paragraph.su_card_header &&
          <h2 className="order-2 text-m2">{paragraph.su_card_header}</h2>
        }

        {paragraph.su_card_super_header &&
          <div
            className="order-1 font-semibold">{paragraph.su_card_super_header}</div>
        }

        {paragraph.su_card_body &&
          <Wysiwyg html={paragraph.su_card_body} className="order-3"/>
        }

        {paragraph.su_card_link &&
          <div className="order-4">
            {linkStyle === 'action' &&
              <ActionLink href={paragraph.su_card_link.url}>
                {paragraph.su_card_link.title}
              </ActionLink>
            }

            {linkStyle != 'action' &&
              <Button href={paragraph.su_card_link.url}>
                {paragraph.su_card_link.title}
              </Button>
            }
          </div>
        }
      </div>
    </div>
  )
}
export default CardParagraph
