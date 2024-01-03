import MediaCaptionParagraphDisplay
  from "@components/paragraphs/stanford-media-caption/media-caption-paragraph-display";
import {HtmlHTMLAttributes} from "react";
import {MediaCaptionParagraphType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: MediaCaptionParagraphType
}

const MediaCaptionParagraph = ({paragraph, ...props}: Props) => {
  let imageUrl: string | undefined,
    imageAlt: string | undefined,
    videoUrl: string | undefined

  if (paragraph.su_media_caption_media?.type === 'media--image') {
    imageUrl = paragraph.su_media_caption_media.field_media_image?.uri.url;
    imageAlt = paragraph.su_media_caption_media.field_media_image?.resourceIdObjMeta?.alt || '';
  }
  if (paragraph.su_media_caption_media?.type === 'media--video') {
    videoUrl = paragraph.su_media_caption_media.field_media_oembed_video
  }

  return (
    <div {...props}>
      <MediaCaptionParagraphDisplay
        media={imageUrl || videoUrl ? {imageUrl: imageUrl && buildUrl(imageUrl).toString(), imageAlt, videoUrl} : undefined}
        link={paragraph.su_media_caption_link}
        caption={paragraph.su_media_caption_caption}
      />
    </div>
  )
}
export default MediaCaptionParagraph