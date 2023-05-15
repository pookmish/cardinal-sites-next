import {DrupalParagraph} from "next-drupal";
import Paragraph from "@/components/paragraphs/paragraph";

const TwoColumn = ({items}: { items: DrupalParagraph[] }) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  return (
    <div className="w-full max-w-[calc(100vw-5rem)] mx-auto grid md:grid-cols-2 w-full gap-20">
      <div className="">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>

      <div className="">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>
    </div>
  )
}
export default TwoColumn;