import Link from "@components/elements/link";
import Image from "next/image";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeStanfordPage} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPage
  headingLevel?: string
}

const StanfordPageListItem = ({node, headingLevel, ...props}: Props) => {
  const image = node.suPageImage?.mediaImage || node.suPageBanner?.suBannerImage?.mediaImage;

  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="@container py-10 ">
      <div className="flex flex-col @4xl:flex-row justify-between gap-20" {...props}>
        <div className="order-2 @4xl:order-1">
          <Heading className="text-m2" id={node.id}>
            <Link href={node.path}>
              {node.title}
            </Link>
          </Heading>

          {node.suPageDescription &&
            <p>{node.suPageDescription}</p>
          }
        </div>

        {image?.url &&
          <div
            className="order-1 @4xl:order-2 relative aspect-[16/9] h-fit w-full @4xl:w-1/4 shrink-0">
            <Image
              className="object-cover"
              src={image.url}
              alt={image.alt || ''}
              fill
              sizes={'(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px'}
            />
          </div>
        }
      </div>
    </article>
  );
};
export default StanfordPageListItem;