import {MediaCaptionParagraphType} from "@lib/types";
import MediaCaptionParagraphDisplay
  from "@components/paragraphs/stanford-media-caption/media-caption-paragraph-display";
import {PropsWithoutRef} from "react";

const MediaCaptionParagraph = ({paragraph, ...props}: PropsWithoutRef<{ paragraph: MediaCaptionParagraphType }>) => {
  let imageUrl: string | undefined,
    imageAlt: string | undefined,
    videoUrl: string | undefined,
    placeholder: string | undefined;

  if (paragraph.su_media_caption_media?.type === 'media--image') {
    imageUrl = paragraph.su_media_caption_media?.field_media_image?.image_style_uri?.breakpoint_2xl_1x;
    imageAlt = paragraph.su_media_caption_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';
    placeholder = paragraph.su_media_caption_media?.field_media_image?.uri.base64;
  }
  if (paragraph.su_media_caption_media?.type == 'media--video') {
    videoUrl = paragraph.su_media_caption_media?.field_media_oembed_video;
  }

  return (
    <div {...props}>
      <MediaCaptionParagraphDisplay
        media={imageUrl || videoUrl ? {imageUrl, imageAlt, videoUrl, placeholder} : undefined}
        link={paragraph.su_media_caption_link}
        caption={paragraph.su_media_caption_caption}
      />
    </div>
  )
}
export default MediaCaptionParagraph