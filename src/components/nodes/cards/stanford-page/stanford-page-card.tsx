import Link from "@components/elements/link";
import Image from "next/image";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeStanfordPage, Image as ImageType} from "@lib/gql/__generated__/drupal";
import {getMediaFromEntityField} from "@lib/drupal/get-media-from-entity";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPage
  headingLevel?: string
}

const StanfordPageCard = ({node, headingLevel, ...props}: Props) => {
  const image = getMediaFromEntityField<ImageType>(node.suPageImage) || getMediaFromEntityField<ImageType>(node.suPageBanner?.__typename === 'ParagraphStanfordBanner' ? node.suPageBanner?.suBannerImage : undefined);

  const imageUrl = image?.url

  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 overflow-hidden" {...props}>
      {imageUrl &&
        <div
          className="relative aspect-[16/9] w-full">
          <Image
            className="object-cover"
            src={imageUrl}
            alt={image?.alt || ''}
            fill
            sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
          />
        </div>
      }
      <div className="p-10">

        <Heading className="text-m2 [&_a]:text-black" id={node.id}>
          <Link href={node.path}>
            {node.title}
          </Link>
        </Heading>

        {node.suPageDescription &&
          <p>{node.suPageDescription}</p>
        }
      </div>
    </article>
  );
};
export default StanfordPageCard;