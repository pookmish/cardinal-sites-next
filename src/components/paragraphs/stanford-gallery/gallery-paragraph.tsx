import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button"
import Image from "next/image"
import {H2} from "@components/elements/headers"
import {ElementType, HtmlHTMLAttributes} from "react"
import {MediaStanfordGalleryImage, ParagraphStanfordGallery} from "@lib/gql/__generated__/drupal.d"
import Link from "@components/elements/link"
import twMerge from "@lib/utils/twMerge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordGallery
}

const GalleryParagraph = ({paragraph, ...props}: Props) => {
  const GalleryWrapper: ElementType = paragraph.suGalleryHeadline ? "article" : "div"

  return (
    <GalleryWrapper
      {...props}
      className={twMerge("centered mb-20 flex flex-col gap-10 @container xl:max-w-[980px]", props.className)}
      aria-labelledby={paragraph.suGalleryHeadline ? paragraph.id : undefined}
    >
      {paragraph.suGalleryHeadline && (
        <H2 id={paragraph.id} className="text-center">
          {paragraph.suGalleryHeadline}
        </H2>
      )}

      <Wysiwyg html={paragraph.suGalleryDescription?.processed} />

      {paragraph.suGalleryImages && paragraph.suGalleryImages?.length > 0 && (
        <ul className="list-unstyled grid gap-20 @5xl:grid-cols-2 @9xl:grid-cols-3">
          {paragraph.suGalleryImages.map(image => (
            <li key={image.id} className="m-0">
              <GalleryImage image={image} galleryId={paragraph.id} />
            </li>
          ))}
        </ul>
      )}

      {paragraph.suGalleryButton && (
        <div>
          <Button href={paragraph.suGalleryButton.url}>{paragraph.suGalleryButton.title}</Button>
        </div>
      )}
    </GalleryWrapper>
  )
}

const GalleryImage = ({
  image,
  galleryId,
}: {
  image: MediaStanfordGalleryImage
  galleryId: ParagraphStanfordGallery["id"]
}) => {
  const imageUrl = image.suGalleryImage?.url
  if (!imageUrl) return

  return (
    <figure>
      <div className="relative aspect-[4/3] w-full">
        <Link
          href={`/gallery/${galleryId}/${image.id}`}
          className="relative block h-full w-full"
          rel="nofollow"
          scroll={false}
          prefetch={false}
        >
          <Image
            className="object-cover"
            src={imageUrl}
            alt={image.suGalleryImage?.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <span className="sr-only">Opens a dialog of this image.</span>
        </Link>
      </div>

      {image.suGalleryCaption && <figcaption className="basefont-19 text-right">{image.suGalleryCaption}</figcaption>}
    </figure>
  )
}
export default GalleryParagraph
