import OneColumn from "@components/paragraphs/rows/one-column";
import TwoColumn from "@components/paragraphs/rows/two-column";
import ThreeColumn from "@components/paragraphs/rows/three-column";
import {ParagraphStanfordLayout, ParagraphUnion} from "@lib/gql/__generated__/drupal";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";

type Layout = Record<string, {
  item: ParagraphStanfordLayout
  layout: string
  config?: Record<string, any>
  children: ParagraphUnion[]
}>

const Rows = async ({components}: { components: ParagraphUnion[] }) => {

  const layouts: Layout = {};

  // Set the layouts first.
  components.map(item => {
    if (item.__typename === 'ParagraphStanfordLayout') {
      const behaviors = getParagraphBehaviors(item);

      layouts[item.id] = {
        item,
        layout: behaviors.layout_paragraphs?.layout || 'layout_paragraphs_1_column',
        config: behaviors.layout_paragraphs?.config,
        children: []
      }
    }
  })

  // Add the components to each of the layouts.
  components.map(item => {
    const behaviors = getParagraphBehaviors(item);
    const parentUUID = behaviors?.layout_paragraphs?.parent_uuid
    if (parentUUID && layouts[parentUUID]) {
      layouts[parentUUID].children.push(item);
    }
  })

  return (
    <div className="grid gap-32 mb-10">
      {Object.keys(layouts).map(layoutId =>
        <Row
          key={layoutId}
          layout={layouts[layoutId].layout}
          layoutSettings={layouts[layoutId].config}
          items={layouts[layoutId].children}
        />
      )}
    </div>
  )
}

const Row = ({layout, layoutSettings, items}: {
  layout: string
  layoutSettings?: Record<string, any>
  items: ParagraphUnion[]
}) => {
  return (
    <>
      {layout === 'layout_paragraphs_1_column' &&
        <OneColumn items={items}/>}
      {layout === 'layout_paragraphs_2_column' &&
        <TwoColumn config={layoutSettings} items={items}/>}
      {layout === 'layout_paragraphs_3_column' &&
        <ThreeColumn items={items}/>}
    </>
  )
}


export default Rows