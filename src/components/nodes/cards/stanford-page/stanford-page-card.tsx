import Link from "@components/elements/link";
import Image from "next/image";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeStanfordPage} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPage
  headingLevel?: "h2" | "h3"
}

const StanfordPageCard = ({node, headingLevel, ...props}: Props) => {
  const image = node.suPageImage?.mediaImage || node.suPageBanner?.suBannerImage?.mediaImage

  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 overflow-hidden" {...props}>
      {image?.url &&
        <div
          className="relative aspect-[16/9] w-full">
          <Image
            className="object-cover"
            src={image.url}
            alt={image.alt || ''}
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