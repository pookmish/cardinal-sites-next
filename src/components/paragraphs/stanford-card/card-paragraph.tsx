import {CardParagraphType} from "@lib/types";
import CardParagraphDisplay from "@components/paragraphs/stanford-card/card-paragraph-display";

const CardParagraph = ({paragraph}: { paragraph: CardParagraphType }) => {
  let imageUrl: string | undefined,
    imageAlt: string | undefined,
    videoUrl: string | undefined,
    placeholder: string | undefined;

  if (paragraph.su_card_media?.type === 'media--image') {
    imageUrl = paragraph.su_card_media?.field_media_image?.image_style_uri.breakpoint_2xl_2x;
    imageAlt = paragraph.su_card_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';
    placeholder = paragraph.su_card_media?.field_media_image?.uri?.base64;
  }
  if (paragraph.su_card_media?.type == 'media--video') {
    videoUrl = paragraph.su_card_media?.field_media_oembed_video;
  }

  const linkStyle = paragraph.behavior_settings?.su_card_styles?.link_style;
  return (
    <CardParagraphDisplay
      media={imageUrl ? {imageUrl, imageAlt, videoUrl, placeholder} : undefined}
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
