import {HtmlHTMLAttributes} from "react";
import {SpacerParagraphType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: SpacerParagraphType
}

const SpacerParagraph = ({paragraph, ...props}: Props) => {
  let h = 'h-20';
  if (paragraph.su_spacer_size === 'su-spacer-minimal') h = 'h-10'
  if (paragraph.su_spacer_size === 'su-spacer-reduced') h = 'h-15'
  return (
    <div className={h} {...props}></div>
  )
}
export default SpacerParagraph