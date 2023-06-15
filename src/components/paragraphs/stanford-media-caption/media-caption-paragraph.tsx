import {MediaCaptionParagraphType} from "@lib/types";
import MediaCaptionParagraphDisplay from "@components/paragraphs/stanford-media-caption/media-caption-paragraph-display";

const MediaCaptionParagraph = ({paragraph}: { paragraph: MediaCaptionParagraphType }) => {
  const imageUrl = paragraph.su_media_caption_media?.field_media_image?.image_style_uri?.breakpoint_2xl_1x;
  const imageAlt = paragraph.su_media_caption_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const videoUrl = paragraph.su_media_caption_media?.field_media_oembed_video
  const placeholder = paragraph.su_media_caption_media?.field_media_image?.uri.base64;

  return (
    <MediaCaptionParagraphDisplay
      media={imageUrl || videoUrl ? {imageUrl, imageAlt, videoUrl, placeholder} : undefined}
      link={paragraph.su_media_caption_link}
      caption={paragraph.su_media_caption_caption}
    />
  )
}
export default MediaCaptionParagraph