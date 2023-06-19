import {BasicPageNodeType} from "@lib/types";
import Link from "@components/elements/link";
import Image from "next/image";
import {H2, H3} from "@components/elements/headers";

const StanfordPageCard = ({node, headingLevel}: { node: BasicPageNodeType, headingLevel?: string }) => {
  const imageUrl = node.su_page_image?.field_media_image?.image_style_uri.card_1900x950 || node.su_page_banner?.su_banner_image?.field_media_image?.image_style_uri?.card_1900x950
  const imageAlt = (node.su_page_image?.field_media_image?.resourceIdObjMeta?.alt || node.su_page_banner?.su_banner_image?.field_media_image?.resourceIdObjMeta?.alt) ?? '';
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 overflow-hidden">
      {imageUrl &&
        <div
          className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      }
      <div className="p-10">

        <Heading className="text-m2 [&_a]:text-black">
          <Link href={node.path?.alias} >
            {node.title}
          </Link>
        </Heading>

        {node.su_page_description &&
          <p>{node.su_page_description}</p>
        }
      </div>
    </div>
  );
};
export default StanfordPageCard;