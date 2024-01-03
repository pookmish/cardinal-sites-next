import MediaCaptionParagraphDisplay
  from "@components/paragraphs/stanford-media-caption/media-caption-paragraph-display";
import {HtmlHTMLAttributes} from "react";
import {ParagraphStanfordMediaCaption} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordMediaCaption
}

const MediaCaptionParagraph = ({paragraph, ...props}: Props) => {
  let imageUrl: string | undefined,
    imageAlt: string | undefined,
    videoUrl: string | undefined

  if (paragraph.suMediaCaptionMedia?.__typename === 'MediaImage') {
    imageUrl = paragraph.suMediaCaptionMedia.mediaImage.url;
    imageAlt = paragraph.suMediaCaptionMedia.mediaImage.alt || '';
  }
  if (paragraph.suMediaCaptionMedia?.__typename === 'MediaVideo') {
    videoUrl = paragraph.suMediaCaptionMedia.mediaOembedVideo
  }

  return (
    <div {...props}>
      <MediaCaptionParagraphDisplay
        media={imageUrl || videoUrl ? {imageUrl, imageAlt, videoUrl} : undefined}
        link={paragraph.suMediaCaptionLink}
        caption={paragraph.suMediaCaptionCaption?.processed}
      />
    </div>
  )
}
export default MediaCaptionParagraph