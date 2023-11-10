import Paragraph from "@components/paragraphs/paragraph";
import {StanfordParagraph} from "@lib/types";

const OneColumn = ({items}: { items: StanfordParagraph[] }) => {
  return (
    <div className="flex flex-col gap-40">
      {items.map(item =>
        <Paragraph paragraph={item} key={item.id}/>
      )}
    </div>
  )
}
export default OneColumn;