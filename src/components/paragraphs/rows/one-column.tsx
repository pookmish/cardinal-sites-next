import {DrupalParagraph} from "next-drupal";
import Paragraph from "@/components/paragraphs/paragraph";

const OneColumn = ({items}: { items: DrupalParagraph[] }) => {
  return (
    <div className="flex flex-col gap-40">
      {items.map(item =>
        <Paragraph paragraph={item} key={item.id}/>
      )}
    </div>
  )
}
export default OneColumn;