import {DrupalParagraph} from "next-drupal";
import Paragraph from "@/components/paragraphs/paragraph";

const TwoColumn = ({items, config}: { items: DrupalParagraph[], config: { [key: string]: any } | undefined }) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  let gridCols = 'md:grid-cols-2';
  if (config?.column_widths === '33-67') {
     gridCols = 'md:grid-cols-1-2';
  } else if (config?.column_widths === '67-33') {
     gridCols = 'md:grid-cols-2-1';
  }

  return (
    <div className={`w-full max-w-[calc(100vw-5rem)] mx-auto grid ${gridCols} w-full gap-20`}>
      <div className="flex flex-col gap-40">
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>

      <div className="flex flex-col gap-40">
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>
    </div>
  )
}
export default TwoColumn;