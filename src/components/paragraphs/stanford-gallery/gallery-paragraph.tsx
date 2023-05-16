import {DrupalGalleryImageMediaType, ImageGalleryParagraphType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import Button from "@/components/elements/button";
import Image from "next/image";

const GalleryParagraph = ({paragraph}: { paragraph: ImageGalleryParagraphType }) => {
  return (
    <div className="@container cc lg:max-w-[980px] w-full">
      {paragraph.su_gallery_headline &&
        <h2>{paragraph.su_gallery_headline}</h2>
      }

      {paragraph.su_gallery_description &&
        <Wysiwyg html={paragraph.su_gallery_description}/>
      }

      {paragraph.su_gallery_images &&
        <div className="grid @3xl:grid-cols-2 @6xl:grid-cols-3 gap-20 mb-10">
          {paragraph.su_gallery_images.map(image =>
            <GalleryImage image={image} key={image.id}/>
          )}
        </div>
      }

      {paragraph.su_gallery_button &&
        <Button href={paragraph.su_gallery_button.url}>
          {paragraph.su_gallery_button.title}
        </Button>
      }
    </div>
  )
}

const GalleryImage = ({image}: { image: DrupalGalleryImageMediaType }) => {
  const imageUrl = image.su_gallery_image.image_style_uri.card_1900x950
  const imageAlt = image.su_gallery_image.resourceIdObjMeta.alt

  return (
    <figure>
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
        />
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