import {WysiwygParagraphType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import {JSX} from "react";

const WysiwygParagraph = ({paragraph}: { paragraph: WysiwygParagraphType }): JSX.Element => {
  return (
    <>
      {paragraph.su_wysiwyg_text &&
        <div className="centered lg:max-w-[980px]">
          <Wysiwyg html={paragraph.su_wysiwyg_text}/>
        </div>
      }
    </>
  )

}
export default WysiwygParagraph