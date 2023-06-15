import {SpeakerParagraphType} from "@lib/types";
import Image from "next/image";
import Link from "@components/elements/link";

const PersonCtaParagraph = ({paragraph}: { paragraph: SpeakerParagraphType }) => {
  const imageUrl = paragraph.su_person_cta_image?.field_media_image?.image_style_uri?.square_478;
  const imageAlt = paragraph.su_person_cta_image?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  return (
    <div className="centered flex gap-10">
      {imageUrl &&
        <div className="relative aspect-[1/1] w-[200px]">
          <Image
            src={imageUrl}
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