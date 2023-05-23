import {MediaCaptionParagraphType} from "@/lib/types";
import Image from "next/image";
import Oembed from "@/components/elements/ombed";
import Link from "@/components/elements/link";
import Wysiwyg from "@/components/elements/wysiwyg";

const MediaCaptionParagraph = ({paragraph}: { paragraph: MediaCaptionParagraphType }) => {
  const imageUrl = paragraph.su_media_caption_media?.field_media_image?.image_style_uri?.breakpoint_2xl_1x;
  const imageAlt = paragraph.su_media_caption_media?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const videoUrl = paragraph.su_media_caption_media?.field_media_oembed_video
  const placeholder = paragraph.su_media_caption_media?.field_media_image?.uri.base64;

  return (
    <figure
      className="centered lg:max-w-[980px]">
      {imageUrl &&
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill={true}
            placeholder={placeholder ? 'blur': 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }
      {videoUrl && <Oembed url={videoUrl}/>}

      <figcaption className="text-right">
        {paragraph.su_media_caption_link &&
          <Link href={paragraph.su_media_caption_link.url} className="">
            {paragraph.su_media_caption_link.title}
          </Link>
        }

        {paragraph.su_media_caption_caption &&
          <Wysiwyg html={paragraph.su_media_caption_caption}/>
        }
      </figcaption>
    </figure>
  )
}
export default MediaCaptionParagraph