import {PersonNodeType} from "@lib/types";
import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";

const StanfordPersonCard = ({node, headingLevel}: { node: PersonNodeType, headingLevel?: string }) => {
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri.square_956
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="max-w-[500px] w-full mx-auto text-center overflow-hidden">
      {imageUrl &&
        <div className="relative aspect-[1/1] mx-auto mb-20 w-3/5">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="rounded-full object-cover"
            placeholder={placeholder ? "blur" : "empty"}
            blurDataURL={placeholder}
          />
        </div>
      }

      <Heading className="text-m2">
        <Link href={node.path?.alias} className="text-digital-red no-underline hocus:no-underline hocus:text-black">
          {node.title}
        </Link>
      </Heading>

      {node.su_person_full_title &&
        <div>{node.su_person_short_title}</div>
      }
    </div>
  )
}
export default StanfordPersonCard;