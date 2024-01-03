import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";
import Image from "next/image";
import Link from "next/link";
import {H2} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {DrupalGalleryImageMediaType, ImageGalleryParagraphType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ImageGalleryParagraphType
}

const GalleryParagraph = ({paragraph, ...props}: Props) => {
  return (
    <div className="@container centered lg:max-w-[980px] flex flex-col gap-10 mb-20" {...props}>
      {paragraph.su_gallery_headline &&
        <H2>{paragraph.su_gallery_headline}</H2>
      }

      {paragraph.su_gallery_description &&
        <Wysiwyg html={paragraph.su_gallery_description}/>
      }

      {paragraph.su_gallery_images &&
        <div className="grid @3xl:grid-cols-2 @6xl:grid-cols-3 gap-20">
          {paragraph.su_gallery_images.map(image =>
            <GalleryImage image={image} key={image.id}/>
          )}
        </div>
      }

      {paragraph.su_gallery_button &&
        <div>
          <Button href={paragraph.su_gallery_button.url}>
            {paragraph.su_gallery_button.title}
          </Button>
        </div>
      }
    </div>
  )
}

const GalleryImage = ({image}: { image: DrupalGalleryImageMediaType }) => {
  const imageUrl = image.su_gallery_image.uri.url
  const imageAlt = image.su_gallery_image.resourceIdObjMeta?.alt || ''

  return (
    <figure>
      <div className="relative aspect-[4/3] w-full">
        <Link href={`/gallery-image/${image.id}`}>
          <Image
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </Link>
      </div>

      {image.su_gallery_caption &&
        <figcaption className="text-right">
          {image.su_gallery_caption}
        </figcaption>
      }
    </figure>
  )
}
export default GalleryParagraph