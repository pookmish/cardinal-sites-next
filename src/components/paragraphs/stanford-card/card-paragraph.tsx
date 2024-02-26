import {HtmlHTMLAttributes} from "react";
import {ParagraphStanfordCard} from "@lib/gql/__generated__/drupal.d";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";
import Image from "next/image";
import Oembed from "@components/elements/ombed";
import {H2} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import ActionLink from "@components/elements/action-link";
import Button from "@components/elements/button";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordCard
}

const CardParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)

  const image = paragraph.suCardMedia?.__typename === 'MediaImage' ? paragraph.suCardMedia.mediaImage : undefined;
  const videoUrl = paragraph.suCardMedia?.__typename === 'MediaVideo' && paragraph.suCardMedia.mediaOembedVideo;

  return (
    <div {...props}>
      <div className="centered lg:max-w-[980px] w-full shadow-lg border border-black-10">
        {image?.url &&
          <div className="relative aspect-[16/9] w-full">
            <Image
              className="object-cover object-center"
              src={image.url}
              alt={image.alt || ""}
              fill
              sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
            />
          </div>
        }

        {videoUrl &&
          <Oembed url={videoUrl}/>
        }

        <div className="py-20 px-10 lg:px-20 flex flex-col gap-5">
          {paragraph.suCardHeader &&
            <H2 className="order-2 text-m2">{paragraph.suCardHeader}</H2>
          }

          {paragraph.suCardSuperHeader &&
            <div className="order-1 font-semibold">
              {paragraph.suCardSuperHeader}
            </div>
          }

          {paragraph.suCardBody &&
            <Wysiwyg html={paragraph.suCardBody.processed} className="order-3"/>
          }

          {paragraph.suCardLink?.url &&
            <div className="order-4">
              {behaviors.su_card_styles?.link_style === 'action' &&
                <ActionLink href={paragraph.suCardLink.url}>
                  {paragraph.suCardLink.title}
                </ActionLink>
              }

              {behaviors.su_card_styles?.link_style != 'action' &&
                <Button href={paragraph.suCardLink.url}>
                  {paragraph.suCardLink.title}
                </Button>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default CardParagraph
