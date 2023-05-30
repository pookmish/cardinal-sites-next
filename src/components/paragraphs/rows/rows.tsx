import OneColumn from "@/components/paragraphs/rows/one-column";
import TwoColumn from "@/components/paragraphs/rows/two-column";
import ThreeColumn from "@/components/paragraphs/rows/three-column";
import {getResources} from "@/lib/drupal/get-resource";
import {DrupalParagraphWithBehaviors, LayoutParagraphsBehaviorsType} from "@/lib/types";
import {DrupalParagraph} from "next-drupal";

interface LayoutsProps {
  [key: string]: DrupalParagraphWithBehaviors
}

const Rows = async ({components}: { components: DrupalParagraphWithBehaviors[] }) => {
  const layouts: LayoutsProps = {};
  components = await getResources(components);

  // Set the layouts first.
  components.map(item => {
    if (item?.behavior_settings?.layout_paragraphs?.layout) {
      layouts[item.id] = item;
      layouts[item.id].children = [];
    }
  })

  // Add the components to each of the layouts.
  components.map(item => {
    const parentUUID = item?.behavior_settings?.layout_paragraphs?.parent_uuid;
    if (parentUUID && layouts[parentUUID]) {
      layouts[parentUUID].children.push(item);
    }
  })

  return (
    <div className="grid gap-32 mb-10">
      {Object.keys(layouts).map(layoutId =>
        <Row
          key={layoutId}
          layoutSettings={layouts[layoutId].behavior_settings?.layout_paragraphs}
          items={layouts[layoutId].children}
        />
      )}
    </div>
  )
}

const Row = ({layoutSettings, items}: { layoutSettings: LayoutParagraphsBehaviorsType | undefined, items: DrupalParagraphWithBehaviors[] }) => {
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