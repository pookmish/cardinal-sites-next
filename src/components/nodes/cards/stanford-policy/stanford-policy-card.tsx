import Link from "@components/elements/link";
import Wysiwyg from "@components/elements/wysiwyg";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {PolicyNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: PolicyNodeType
  headingLevel?: string
}

const StanfordPolicyCard = ({node, headingLevel, ...props}: Props) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  const trimmedBodyText = node.body?.processed.replace(/(<([^>]+)>)/ig, ' ')
    .split(" ")
    .slice(0, 50)
    .filter((word: string) => !!word)
    .join(" ");

  const teaserSummary = node.body?.summary || (trimmedBodyText + '...');
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 p-10 overflow-hidden" {...props}>

      <Heading className="text-m2" id={node.id}>
        <Link href={node.path.alias}>
          {node.title}
        </Link>
      </Heading>

      {teaserSummary &&
        <Wysiwyg html={teaserSummary}/>
      }
    </article>
  )
}
export default StanfordPolicyCard;