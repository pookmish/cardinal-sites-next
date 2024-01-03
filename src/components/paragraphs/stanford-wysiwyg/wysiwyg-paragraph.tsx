import Wysiwyg from "@components/elements/wysiwyg";
import {HtmlHTMLAttributes} from "react";
import {WysiwygParagraphType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: WysiwygParagraphType
}

const WysiwygParagraph = ({paragraph, ...props}: Props) => {
  if (paragraph.su_wysiwyg_text) {
    return (
      <div className="centered lg:max-w-[980px]" {...props}>
        <Wysiwyg html={paragraph.su_wysiwyg_text}/>
      </div>
    )
  }

}
export default WysiwygParagraph