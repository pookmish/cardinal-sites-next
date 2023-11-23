import {WysiwygParagraphType} from "@lib/types";
import Wysiwyg from "@components/elements/wysiwyg";
import {PropsWithoutRef} from "react";

const WysiwygParagraph = ({paragraph, ...props}: PropsWithoutRef<{ paragraph: WysiwygParagraphType }>) => {
  return (
    <>
      {paragraph.su_wysiwyg_text &&
        <div className="centered lg:max-w-[980px]" {...props}>
          <Wysiwyg html={paragraph.su_wysiwyg_text}/>
        </div>
      }
    </>
  )

}
export default WysiwygParagraph