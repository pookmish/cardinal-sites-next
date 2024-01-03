import Link from "@components/elements/link";
import Image from "next/image";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {BasicPageNodeType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: BasicPageNodeType
  headingLevel?: string
}

const StanfordPageCard = ({node, headingLevel, ...props}: Props) => {
  const image = node.su_page_image?.field_media_image || node.su_page_banner?.su_banner_image?.field_media_image
  const imageUrl = image?.uri.url
  const imageAlt = image?.resourceIdObjMeta?.alt || '';

  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 overflow-hidden" {...props}>
      {imageUrl &&
        <div
          className="relative aspect-[16/9] w-full">
          <Image
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      }
      <div className="p-10">

        <Heading className="text-m2 [&_a]:text-black" id={node.id}>
          <Link href={node.path.alias}>
            {node.title}
          </Link>
        </Heading>

        {node.su_page_description &&
          <p>{node.su_page_description}</p>
        }
      </div>
    </article>
  );
};
export default StanfordPageCard;