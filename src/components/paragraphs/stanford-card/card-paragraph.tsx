import {CardParagraphType} from "@lib/types";
import CardParagraphDisplay from "@components/paragraphs/stanford-card/card-paragraph-display";

const CardParagraph = ({paragraph}: { paragraph: CardParagraphType }) => {
  const imageUrl = paragraph.su_card_media?.field_media_image?.image_style_uri.breakpoint_2xl_2x;
  const imageAlt = paragraph.su_card_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const videoUrl = paragraph.su_card_media?.field_media_oembed_video;
  const linkStyle = paragraph.behavior_settings?.su_card_styles?.link_style;
  const placeholder = paragraph.su_card_media?.field_media_image?.uri?.base64;

  return (
    <CardParagraphDisplay
      media={imageUrl ? {imageUrl, imageAlt, videoUrl, placeholder}: undefined}
      header={paragraph.su_card_header}
      supHeader={paragraph.su_card_super_header}
      body={paragraph.su_card_body}
      link={paragraph.su_card_link && {
        ...paragraph.su_card_link,
        style: linkStyle
      }}
    />
  )
}

export default CardParagraph
