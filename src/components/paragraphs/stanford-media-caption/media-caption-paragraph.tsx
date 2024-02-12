import {HtmlHTMLAttributes} from "react";
import {ParagraphStanfordMediaCaption} from "@lib/gql/__generated__/drupal";
import Image from "next/image";
import Oembed from "@components/elements/ombed";
import Link from "@components/elements/link";
import Wysiwyg from "@components/elements/wysiwyg";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordMediaCaption
}

const MediaCaptionParagraph = ({paragraph, ...props}: Props) => {
  const image = paragraph.suMediaCaptionMedia?.__typename === 'MediaImage' ? paragraph.suMediaCaptionMedia.mediaImage : undefined;
  const videoUrl = paragraph.suMediaCaptionMedia?.__typename === 'MediaVideo' && paragraph.suMediaCaptionMedia.mediaOembedVideo;

  return (
    <div {...props}>
      <figure
        className="centered lg:max-w-[980px]">
        {image?.url &&
          <div className="relative aspect-[16/9] w-full">
            <Image
              className="object-cover"
              src={image.url}
              alt={image.alt || ""}
              fill
              sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
            />
          </div>
        }
        {videoUrl && <Oembed url={videoUrl}/>}

        <figcaption className="text-right">
          {paragraph.suMediaCaptionLink?.url &&
            <Link href={paragraph.suMediaCaptionLink.url} className="">
              {paragraph.suMediaCaptionLink.title}
            </Link>
          }

          {paragraph.suMediaCaptionCaption &&
            <Wysiwyg html={paragraph.suMediaCaptionCaption.processed}/>
          }
        </figcaption>
      </figure>
    </div>
  )
}
export default MediaCaptionParagraph