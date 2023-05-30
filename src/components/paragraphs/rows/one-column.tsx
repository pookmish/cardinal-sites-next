import {DrupalParagraph} from "next-drupal";
import Paragraph from "@/components/paragraphs/paragraph";

const OneColumn = ({items}: { items: DrupalParagraph[] }) => {
  return (
    <div className="grid gap-40">
      {items.map(item =>
        /* @ts-expect-error Async Server Component */
        <Paragraph paragraph={item} key={item.id}/>
      )}
    </div>
  )
}
export default OneColumn;