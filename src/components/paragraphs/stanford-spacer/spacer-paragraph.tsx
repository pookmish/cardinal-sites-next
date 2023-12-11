import {SpacerParagraphType} from "@lib/types";
import {PropsWithoutRef} from "react";

const SpacerParagraph = ({paragraph, ...props}: PropsWithoutRef<{ paragraph: SpacerParagraphType }>) => {
  let h = 'h-20';
  if (paragraph.su_spacer_size === 'su-spacer-minimal') h = 'h-10'
  if (paragraph.su_spacer_size === 'su-spacer-reduced') h = 'h-15'
  return (
    <div className={h} {...props}></div>
  )
}
export default SpacerParagraph