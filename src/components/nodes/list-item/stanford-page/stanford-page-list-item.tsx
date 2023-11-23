import {BasicPageNodeType} from "@lib/types";
import Link from "@components/elements/link";
import Image from "next/image";
import {H2, H3} from "@components/elements/headers";
import {PropsWithoutRef} from "react";

const StanfordPageListItem = ({node, headingLevel, ...props}: PropsWithoutRef<{ node: BasicPageNodeType, headingLevel?: string }>) => {
  const imageUrl = node.su_page_image?.field_media_image.image_style_uri.card_1900x950 || node.su_page_banner?.su_banner_image?.field_media_image.image_style_uri.card_1900x950
  const imageAlt = (node.su_page_image?.field_media_image.resourceIdObjMeta?.alt || node.su_page_banner?.su_banner_image?.field_media_image.resourceIdObjMeta?.alt) ?? '';
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="@container py-10 ">
      <div className="flex flex-col @4xl:flex-row gap-20" {...props}>
        <div className="order-2 @4xl:order-1">
          <Link href={node.path?.alias}>
            <Heading className="text-m2">
              {node.title}
            </Heading>
          </Link>

          {node.su_page_description &&
            <p>{node.su_page_description}</p>
          }
        </div>

        {imageUrl &&
          <div
            className="order-1 @4xl:order-2 relative aspect-[16/9] h-fit w-full @4xl:w-1/4 shrink-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        }
      </div>
    </div>
  );
};
export default StanfordPageListItem;