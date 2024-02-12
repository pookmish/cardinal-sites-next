import Wysiwyg from "@components/elements/wysiwyg";
import {HtmlHTMLAttributes} from "react";
import {ParagraphStanfordWysiwyg} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordWysiwyg
}

const WysiwygParagraph = ({paragraph, ...props}: Props) => {
  if (paragraph.suWysiwygText?.processed) {
    return (
      <div className="centered lg:max-w-[980px]" {...props}>
        <Wysiwyg html={paragraph.suWysiwygText.processed}/>
      </div>
    )
  }

}
export default WysiwygParagraph