import Paragraph from "@components/paragraphs/paragraph";
import {StanfordParagraph} from "@lib/types";

const OneColumn = ({items}: { items: StanfordParagraph[] }) => {
  return (
    <div className="row flex flex-col gap-10" data-columns={1}>
      {items.map(item =>
        <Paragraph paragraph={item} key={item.id}/>
      )}
    </div>
  )
}
export default OneColumn;