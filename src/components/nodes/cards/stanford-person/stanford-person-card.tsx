import Image from "next/image";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {PersonNodeType} from "@lib/types";
import {buildUrl} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: PersonNodeType
  headingLevel?: string
}

const StanfordPersonCard = ({node, headingLevel, ...props}: Props) => {
  const imageUrl = node.su_person_photo?.field_media_image?.uri.url;

  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto text-center overflow-hidden" {...props}>
      {imageUrl &&
        <div className="relative aspect-[1/1] mx-auto mb-20 w-3/5">
          <Image
            src={buildUrl(imageUrl).toString()}
            alt=""
            fill
            className="rounded-full object-cover"
          />
        </div>
      }

      <Heading className="text-m2" id={node.id}>
        <Link href={node.path.alias}>
          {node.title}
        </Link>
      </Heading>

      {node.su_person_full_title &&
        <div>{node.su_person_full_title}</div>
      }
    </article>
  )
}
export default StanfordPersonCard;