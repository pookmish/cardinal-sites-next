import {DrupalLinkFieldType} from "@lib/types";
import Image from "next/image";
import Oembed from "@components/elements/ombed";
import {H2} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import ActionLink from "@components/elements/action-link";
import Button from "@components/elements/button";

interface Props {
  media?: {
    imageUrl?: string
    imageAlt?: string
    placeholder?: string
    videoUrl?: string
  }
  header?: string
  supHeader?: string
  body?: string
  link?: DrupalLinkFieldType & {
    style?: 'action' | 'button' | undefined
  }
}

const CardParagraphDisplay = ({media, header, supHeader, body, link}: Props) => {
  const {imageUrl, imageAlt, placeholder, videoUrl} = media ?? {};
  return (
    <div
      className="centered lg:max-w-[980px] w-full shadow-lg border border-black-10">
      {imageUrl &&
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt ?? ""}
            fill
            className="object-cover object-center"
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }

      {videoUrl &&
        <Oembed url={videoUrl}/>
      }

      <div className="py-20 px-10 lg:px-20 flex flex-col gap-5">
        {header &&
          <H2 className="order-2 text-m2">{header}</H2>
        }

        {supHeader &&
          <div
            className="order-1 font-semibold">{supHeader}</div>
        }

        {body &&
          <Wysiwyg html={body} className="order-3"/>
        }

        {link?.url &&
          <div className="order-4">
            {link.style === 'action' &&
              <ActionLink href={link.url}>
                {link.title}
              </ActionLink>
            }

            {link.style != 'action' &&
              <Button href={link.url}>
                {link.title}
              </Button>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default CardParagraphDisplay;