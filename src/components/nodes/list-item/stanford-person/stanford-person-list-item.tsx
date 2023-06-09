import {PersonNodeType} from "@/lib/types";
import Image from "next/image";
import Link from "@/components/elements/link";
import {H3} from "@/components/elements/headers";

const StanfordPersonListItem = ({node}: { node: PersonNodeType }) => {
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri.square_956
  return (
    <div className="max-w-[500px] w-full mx-auto shadow-lg p-20 text-center">
      {imageUrl &&
        <div className="relative aspect-[1/1] w-full mx-auto mb-20">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="rounded-full object-cover"
          />
        </div>
      }
      <Link href={node.path?.alias} className="no-underline hocus:no-underline hocus:text-black">
        <H3 className="text-m2">{node.title}</H3>
      </Link>

      {node.su_person_full_title &&
        <div>{node.su_person_short_title}</div>
      }
    </div>
  )
}
export default StanfordPersonListItem;