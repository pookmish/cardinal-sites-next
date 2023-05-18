import {PersonNodeType} from "@/lib/types";
import Image from "next/image";
import Link from "@/components/elements/link";

const StanfordPersonCard = ({node}: { node: PersonNodeType }) => {
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri.square_956
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64
  return (
    <div className="max-w-[500px] w-full mx-auto text-center overflow-hidden">
      {imageUrl &&
        <div className="relative aspect-[1/1] mx-auto mb-20 w-3/5">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="rounded-full object-cover"
            placeholder={placeholder ? "blur": "empty"}
            blurDataURL={placeholder}
          />
        </div>
      }
      <Link href={node.path} className="text-digital-red no-underline hocus:no-underline hocus:text-black">
        <h3 className="text-m2">{node.title}</h3>
      </Link>

      {node.su_person_full_title &&
        <div>{node.su_person_short_title}</div>
      }
    </div>
  )
}
export default StanfordPersonCard;