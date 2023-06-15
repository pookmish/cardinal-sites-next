import {DrupalLinkFieldType} from "@lib/types";
import Image from "next/image";
import Oembed from "@components/elements/ombed";
import Link from "@components/elements/link";
import Wysiwyg from "@components/elements/wysiwyg";

interface Props {
  media?: {
    imageUrl?: string
    imageAlt?: string
    placeholder?: string
    videoUrl?: string
  }
  link?: DrupalLinkFieldType
  caption?: string
}

const MediaCaptionParagraphDisplay = ({media, caption, link}: Props) => {
  const {imageUrl, imageAlt, placeholder, videoUrl} = media ?? {};

  return (
    <figure
      className="centered lg:max-w-[980px]">
      {imageUrl &&
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt ?? ""}
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
            className="object-cover"
          />
        </div>
      }
      {videoUrl && <Oembed url={videoUrl}/>}

      <figcaption className="text-right">
        {link?.url &&
          <Link href={link.url} className="">
            {link.title}
          </Link>
        }

        {caption &&
          <Wysiwyg html={caption}/>
        }
      </figcaption>
    </figure>
  )
}
export default MediaCaptionParagraphDisplay