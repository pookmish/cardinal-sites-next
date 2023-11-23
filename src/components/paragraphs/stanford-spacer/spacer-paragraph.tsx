import {SpacerParagraphType} from "@lib/types";
import {PropsWithoutRef} from "react";

const SpacerParagraph = ({paragraph, ...props}: PropsWithoutRef<{ paragraph: SpacerParagraphType }>) => {
  return (
    <div className="h-20" {...props}></div>
  )
}
export default SpacerParagraph