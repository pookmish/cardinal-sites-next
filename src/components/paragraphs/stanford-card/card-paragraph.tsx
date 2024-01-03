import CardParagraphDisplay from "@components/paragraphs/stanford-card/card-paragraph-display";
import {HtmlHTMLAttributes} from "react";
import {CardParagraphType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: CardParagraphType
}

const CardParagraph = ({paragraph, ...props}: Props) => {

  let imageUrl: string | undefined,
    imageAlt: string | undefined,
    videoUrl: string | undefined

  if (paragraph.su_card_media?.type=== 'media--image') {
    imageUrl = paragraph.su_card_media.field_media_image?.uri.url
    imageAlt = paragraph.su_card_media.field_media_image?.resourceIdObjMeta?.alt || '';
  }

  if (paragraph.su_card_media?.type=== 'media--video') {
    videoUrl = paragraph.su_card_media.field_media_oembed_video
  }

  return (
    <div {...props}>
      <CardParagraphDisplay
        media={imageUrl || videoUrl ? {imageUrl: imageUrl && buildUrl(imageUrl).toString(), imageAlt, videoUrl} : undefined}
        header={paragraph.su_card_header}
        supHeader={paragraph.su_card_super_header}
        body={paragraph.su_card_body}
        link={{
          url: paragraph.su_card_link?.url,
          title: paragraph.su_card_link?.title,
          style: paragraph.behavior_settings?.su_card_styles?.link_style
        }}
      />
    </div>
  )
}

export default CardParagraph
