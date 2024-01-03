import Wysiwyg from "@components/elements/wysiwyg";
import NodeCard from "@components/nodes/cards/node-card";
import Button from "@components/elements/button";
import {H2} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {EntityTeaserParagraphType, StanfordNode} from "@lib/types";
import {getResources} from "@lib/drupal/get-resource";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: EntityTeaserParagraphType
}

const EntityParagraph = async ({paragraph, ...props}: Props) => {
  const entities = (await getResources<StanfordNode>(paragraph.su_entity_item || []))
    .filter(node => !!node?.id);

  const gridCols = [
    'lg:grid-cols-3',
    'lg:grid-cols-1',
    'lg:grid-cols-2',
  ];
  const gridClass = gridCols[entities.length >= 3 ? 0 : entities.length % 3]

  return (
    <div className="centered lg:max-w-[980px] flex flex-col gap-10 mb-20" {...props}>
      {paragraph.su_entity_headline && <H2 className="text-center">{paragraph.su_entity_headline}</H2>}

      {paragraph.su_entity_description &&
        <Wysiwyg html={paragraph.su_entity_description}/>
      }

      <div className={`grid ${gridClass} [&>*]:w-full gap-20 mb-20`}>
        {entities.map(entity =>
          <NodeCard key={entity.id} node={entity} headingLevel={paragraph.su_entity_headline ? "h3" : "h2"}/>
        )}
      </div>

      {paragraph.su_entity_button?.url &&
        <div>
          <Button href={paragraph.su_entity_button.url} centered>
            {paragraph.su_entity_button.title}
          </Button>
        </div>
      }
    </div>
  )
}
export default EntityParagraph