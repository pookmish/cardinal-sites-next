import {PersonNodeType} from "@lib/types";
import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";

const StanfordPersonListItem = ({node, headingLevel}: { node: PersonNodeType, headingLevel?: string }) => {
  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri.square_956
  const Heading = headingLevel === 'h3' ? H3 : H2;
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

      <Heading className="text-m2">
        <Link href={node.path?.alias} className="no-underline hocus:no-underline hocus:text-black">
          {node.title}
        </Link>
      </Heading>

      {node.su_person_full_title &&
        <div>{node.su_person_short_title}</div>
      }
    </div>
  )
}
export default StanfordPersonListItem;