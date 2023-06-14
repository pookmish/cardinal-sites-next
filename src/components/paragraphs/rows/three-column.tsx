import {DrupalParagraph} from "next-drupal";
import OneColumn from "@/components/paragraphs/rows/one-column";

const ThreeColumn = ({items}: { items: DrupalParagraph[] }) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const mainItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'main');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  return (
    <div className="w-full max-w-[calc(100vw-5rem)] mx-auto grid md:grid-cols-3 w-full gap-20">
      <OneColumn items={leftItems}/>
      <OneColumn items={mainItems}/>
      <OneColumn items={rightItems}/>
    </div>
  )
}
export default ThreeColumn;