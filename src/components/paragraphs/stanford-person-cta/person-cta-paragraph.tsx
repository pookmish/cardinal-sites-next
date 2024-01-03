import Image from "next/image";
import Link from "@components/elements/link";
import {HtmlHTMLAttributes} from "react";
import {SpeakerParagraphType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: SpeakerParagraphType
}

const PersonCtaParagraph = ({paragraph, ...props}: Props) => {
  const image = paragraph.su_person_cta_image?.field_media_image
  const imageUrl = image?.uri.url;
  const imageAlt = image?.resourceIdObjMeta?.alt || '';
  return (
    <div className="centered flex gap-10" {...props}>
      {imageUrl &&
        <div className="relative aspect-[1/1] w-[200px]">
          <Image
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            className="rounded-full"
          />
        </div>
      }

      <div>
        {paragraph.su_person_cta_link?.url &&
          <div>
            <Link href={paragraph.su_person_cta_link.url}>
              {paragraph.su_person_cta_name}
            </Link>
          </div>
        }

        {!paragraph.su_person_cta_link?.url &&
          <div>{paragraph.su_person_cta_name}</div>
        }

        {paragraph.su_person_cta_title}
      </div>
    </div>
  )
}
export default PersonCtaParagraph