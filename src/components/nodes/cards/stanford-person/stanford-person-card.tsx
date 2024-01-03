import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeStanfordPerson, Image as ImageType} from "@lib/gql/__generated__/drupal";
import {getMediaFromEntityField} from "@lib/drupal/get-media-from-entity";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPerson
  headingLevel?: string
}

const StanfordPersonCard = ({node, headingLevel, ...props}: Props) => {
  const imageUrl = getMediaFromEntityField<ImageType>(node.suPersonPhoto)?.url

  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto text-center overflow-hidden" {...props}>
      {imageUrl &&
        <div className="relative aspect-[1/1] mx-auto mb-20 w-3/5">
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
export default StanfordPersonCard;