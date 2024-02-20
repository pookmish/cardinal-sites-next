import OneColumn from "@components/paragraphs/rows/one-column";
import TwoColumn from "@components/paragraphs/rows/two-column";
import ThreeColumn from "@components/paragraphs/rows/three-column";
import {ParagraphStanfordLayout, ParagraphUnion} from "@lib/gql/__generated__/drupal";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";
import {LayoutParagraphBehaviors} from "@lib/drupal/drupal-jsonapi.types";

type Layout = Record<string, {
  item: ParagraphStanfordLayout
  layout: LayoutParagraphBehaviors["layout"]
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
    <div className="space-y-32">
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
  layout: LayoutParagraphBehaviors["layout"]
  layoutSettings?: Record<string, any>
  items: ParagraphUnion[]
}) => {
  if (layout === 'layout_paragraphs_2_column') return <TwoColumn config={layoutSettings} items={items}/>
  if (layout === 'layout_paragraphs_3_column') return <ThreeColumn items={items}/>

  // Fall back to one column if the layout is unknown.
  return <OneColumn items={items}/>
}


export default Rows