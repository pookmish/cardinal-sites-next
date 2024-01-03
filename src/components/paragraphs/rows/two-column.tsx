import OneColumn from "@components/paragraphs/rows/one-column";
import {ParagraphUnion} from "@lib/gql/__generated__/drupal";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";

const TwoColumn = ({items, config}: { items: ParagraphUnion[], config?: Record<string, any> }) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === 'left');
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === 'right');

  let gridCols = 'md:grid-cols-2';
  if (config?.column_widths === '33-67') {
    gridCols = 'md:grid-cols-1-2';
  } else if (config?.column_widths === '67-33') {
    gridCols = 'md:grid-cols-2-1';
  }

  return (
    <div className={`row centered grid ${gridCols} gap-10 md:gap-20`} data-columns={2}>
      <OneColumn items={leftItems}/>
      <OneColumn items={rightItems}/>
    </div>
  )
}
export default TwoColumn;