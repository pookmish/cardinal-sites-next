import {WysiwygParagraphType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";

const WysiwygParagraph = ({paragraph}: { paragraph: WysiwygParagraphType }) => {
  if (paragraph.su_wysiwyg_text) {
    return (
      <div className="cc lg:max-w-[980px] w-full">
        <Wysiwyg html={paragraph.su_wysiwyg_text}/>
      </div>
    )
  }
}
export default WysiwygParagraph