import {EntityTeaserParagraphType} from "@/lib/types";
import {getResources} from "@/lib/drupal/get-resource";
import Wysiwyg from "@/components/elements/wysiwyg";
import NodeCard from "@/components/nodes/cards/node-card";
import Button from "@/components/elements/button";

const EntityParagraph = async ({paragraph}: { paragraph: EntityTeaserParagraphType }) => {
  const items = await getResources(paragraph.su_entity_item ?? []);
  const entities = items.filter(item => item);

  return (
    <div
      className="@container cc lg:max-w-[980px]">
      {paragraph.su_entity_headline && <h2>{paragraph.su_entity_headline}</h2>}

      {paragraph.su_entity_description &&
        <Wysiwyg html={paragraph.su_entity_description}/>
      }

      <div className="flex flex-col mb-20">
        {entities.map(entity =>
          <NodeCard key={entity.id} node={entity}/>
        )}
      </div>

      {paragraph.su_entity_button &&
        <Button href={paragraph.su_entity_button.url}>
          {paragraph.su_entity_button.title}
        </Button>
      }
    </div>
  )
}
export default EntityParagraph