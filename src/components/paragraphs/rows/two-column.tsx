import OneColumn from "@components/paragraphs/rows/one-column";
import {StanfordParagraph} from "@lib/types";

const TwoColumn = ({items, config}: { items: StanfordParagraph[], config: { [key: string]: any } | undefined }) => {
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
      <OneColumn items={leftItems}/>
      <OneColumn items={rightItems}/>
    </div>
  )
}
export default TwoColumn;