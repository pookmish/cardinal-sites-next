import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";
import Image from "next/image";
import Link from "next/link";
import {H2} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {MediaUnion, ParagraphStanfordGallery} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordGallery
}

const GalleryParagraph = ({paragraph, ...props}: Props) => {
  return (
    <div className="@container centered lg:max-w-[980px] flex flex-col gap-10 mb-20" {...props}>
      {paragraph.suGalleryHeadline &&
        <H2>{paragraph.suGalleryHeadline}</H2>
      }

      {paragraph.suGalleryDescription?.processed &&
        <Wysiwyg html={paragraph.suGalleryDescription?.processed}/>
      }

      {paragraph.suGalleryImages &&
        <div className="grid @3xl:grid-cols-2 @6xl:grid-cols-3 gap-20">
          {paragraph.suGalleryImages.map(image =>
            <GalleryImage image={image} key={image.id}/>
          )}
        </div>
      }

      {paragraph.suGalleryButton &&
        <div>
          <Button href={paragraph.suGalleryButton.url}>
            {paragraph.suGalleryButton.title}
          </Button>
        </div>
      }
    </div>
  )
}

const GalleryImage = ({image}: { image: MediaUnion }) => {
  if (image.__typename !== 'MediaStanfordGalleryImage' || !image.suGalleryImage?.url) return;
  const imageUrl = image.suGalleryImage?.url
  const imageAlt = image.suGalleryImage?.alt || ''

  return (
    <figure>
      <div className="relative aspect-[4/3] w-full">
        <Link href={`/gallery-image/${image.id}`}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </Link>
      </div>

      {image.suGalleryCaption &&
        <figcaption className="text-right">
          {image.suGalleryCaption}
        </figcaption>
      }
    </figure>
  )
}
export default GalleryParagraph