import Image from "next/image";
import Oembed from "@components/elements/ombed";
import Link from "@components/elements/link";
import Wysiwyg from "@components/elements/wysiwyg";
import {Maybe, Link as LinkType} from "@lib/gql/__generated__/drupal";

type Props = {
  media?: {
    imageUrl?: Maybe<string>
    imageAlt?: Maybe<string>
    videoUrl?: Maybe<string>
  }
  link?: Maybe<LinkType>
  caption?: Maybe<string>
}

const MediaCaptionParagraphDisplay = ({media, caption, link}: Props) => {
  const {imageUrl, imageAlt, videoUrl} = media ?? {};

  return (
    <figure
      className="centered lg:max-w-[980px]">
      {imageUrl &&
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt ?? ""}
            fill={true}
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