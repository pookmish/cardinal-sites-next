import Image from "next/image";
import Link from "@components/elements/link";
import {HtmlHTMLAttributes} from "react";
import {
  ParagraphStanfordPersonCtum,
  Image as ImageType
} from "@lib/gql/__generated__/drupal";
import {getMediaFromEntityField} from "@lib/drupal/get-media-from-entity";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordPersonCtum
}

const PersonCtaParagraph = ({paragraph, ...props}: Props) => {
  const image = getMediaFromEntityField<ImageType>(paragraph.suPersonCtaImage)
  const imageUrl = image?.url;
  return (
    <div className="centered flex gap-10" {...props}>
      {imageUrl &&
        <div className="relative aspect-[1/1] w-[200px]">
          <Image
            className="rounded-full"
            src={imageUrl}
            alt={image?.alt || ""}
            fill
            sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
          />
        </div>
      }

      <div>
        {paragraph.suPersonCtaLink?.url &&
          <div>
            <Link href={paragraph.suPersonCtaLink.url}>
              {paragraph.suPersonCtaName}
            </Link>
          </div>
        }

        {!paragraph.suPersonCtaLink &&
          <div>{paragraph.suPersonCtaName}</div>
        }

        {paragraph.suPersonCtaTitle}
      </div>
    </div>
  )
}
export default PersonCtaParagraph