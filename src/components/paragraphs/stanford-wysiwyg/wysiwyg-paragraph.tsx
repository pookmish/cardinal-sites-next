import {WysiwygParagraphType} from "@lib/types";
import Wysiwyg from "@components/elements/wysiwyg";

const WysiwygParagraph = ({paragraph}: { paragraph: WysiwygParagraphType }) => {
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