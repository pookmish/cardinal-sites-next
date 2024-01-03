import OneColumn from "@components/paragraphs/rows/one-column";
import {ParagraphUnion} from "@lib/gql/__generated__/drupal";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";

const ThreeColumn = ({items}: { items: ParagraphUnion[] }) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === 'left');
  const mainItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === 'main');
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === 'right');

  return (
    <div className="centered grid md:grid-cols-3 gap-10 md:gap-20" data-columns={3}>
      <OneColumn items={leftItems}/>
      <OneColumn items={mainItems}/>
      <OneColumn items={rightItems}/>
    </div>
  )
}
export default ThreeColumn;