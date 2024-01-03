import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {Image as ImageType, NodeStanfordPerson} from "@lib/gql/__generated__/drupal";
import {getMediaFromEntityField} from "@lib/drupal/get-media-from-entity";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPerson
  headingLevel?: string
}

const StanfordPersonListItem = ({node, headingLevel, ...props}: Props) => {
  const imageUrl = getMediaFromEntityField<ImageType>(node.suPersonPhoto)?.url;

  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="max-w-[500px] w-full mx-auto shadow-lg p-20 text-center" {...props}>
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

      <Heading className="text-m2" id={node.id}>
        <Link href={node.path}>
          {node.title}
        </Link>
      </Heading>

      {node.suPersonFullTitle &&
        <div>{node.suPersonFullTitle}</div>
      }
    </article>
  )
}
export default StanfordPersonListItem;