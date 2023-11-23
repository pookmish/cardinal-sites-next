import OneColumn from "@components/paragraphs/rows/one-column";
import TwoColumn from "@components/paragraphs/rows/two-column";
import ThreeColumn from "@components/paragraphs/rows/three-column";
import {getResources} from "@lib/drupal/get-resource";
import {LayoutParagraphsBehaviorsType, LayoutParagraphType, StanfordParagraph} from "@lib/types";
import {isDraftMode} from "@lib/drupal/utils";


interface Layout {
  [key: string]: {
    item: LayoutParagraphType
    children: StanfordParagraph[]
  }
}

const Rows = async ({components}: { components: StanfordParagraph[] }) => {
  const layouts: Layout = {};

  const draftMode = isDraftMode();
  components = (await getResources<StanfordParagraph>(components, draftMode)).filter(item => !!item);

  // Set the layouts first.
  components.map(item => {
    if (item.type === 'paragraph--stanford_layout') {
      layouts[item.id] = {
        item,
        children: []
      }
    }
  })

  // Add the components to each of the layouts.
  components.map(item => {
    const parentUUID = item.behavior_settings?.layout_paragraphs?.parent_uuid;
    if (parentUUID && layouts[parentUUID]) {
      layouts[parentUUID].children.push(item);
    }
  })

  return (
    <div className="grid gap-32 mb-10">
      {Object.keys(layouts).map(layoutId =>
        <Row
          key={layoutId}
          layoutSettings={layouts[layoutId].item.behavior_settings?.layout_paragraphs}
          items={layouts[layoutId].children}
        />
      )}
    </div>
  )
}

const Row = ({layoutSettings, items}: {
  layoutSettings: LayoutParagraphsBehaviorsType | undefined,
  items: StanfordParagraph[]
}) => {
  return (
    <>
      {layoutSettings?.layout === 'layout_paragraphs_1_column' &&
        <OneColumn items={items}/>}
      {layoutSettings?.layout === 'layout_paragraphs_2_column' &&
        <TwoColumn config={layoutSettings.config} items={items}/>}
      {layoutSettings?.layout === 'layout_paragraphs_3_column' &&
        <ThreeColumn items={items}/>}
    </>
  )
}


export default Rows