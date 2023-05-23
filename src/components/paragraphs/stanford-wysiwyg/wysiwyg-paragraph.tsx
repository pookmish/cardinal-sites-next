import {WysiwygParagraphType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";

const WysiwygParagraph = ({paragraph}: { paragraph: WysiwygParagraphType }) => {
  if (paragraph.su_wysiwyg_text) {
    return (
      <div className="centered lg:max-w-[980px]">
        <Wysiwyg html={paragraph.su_wysiwyg_text}/>
      </div>
    )
  }
}
export default WysiwygParagraph