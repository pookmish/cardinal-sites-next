import {DrupalParagraph} from "next-drupal";
import Paragraph from "@/components/paragraphs/paragraph";

const ThreeColumn = ({items}: { items: DrupalParagraph[] }) => {
  const leftItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'left');
  const mainItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'main');
  const rightItems = items.filter(item => item.behavior_settings.layout_paragraphs.region === 'right');

  return (
    <div className="w-full max-w-[calc(100vw-5rem)] mx-auto grid md:grid-cols-3 w-full gap-20">
      <div className="flex flex-col gap-40">
        {/* @ts-expect-error Async Server Component */}
        {leftItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>

      <div className="flex flex-col gap-40">
        {/* @ts-expect-error Async Server Component */}
        {mainItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>

      <div className="flex flex-col gap-40">
        {/* @ts-expect-error Async Server Component */}
        {rightItems.map(item => <Paragraph key={item.id} paragraph={item}/>)}
      </div>
    </div>
  )
}
export default ThreeColumn;