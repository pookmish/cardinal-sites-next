import {DrupalNode} from "next-drupal";
import NodeCard from "@components/nodes/cards/node-card";
import LoadMoreList from "@components/elements/load-more-list";

const CardViewGrid = ({items, headingLevel}: { items: DrupalNode[], headingLevel: string }) => {
  return (
    <LoadMoreList
      listProps={{className: "list-unstyled flex flex-wrap justify-between gap-20"}}
      itemProps={{className: "flex-1 min-w-[250px]"}}
    >
      {items.map(item =>
        <NodeCard node={item} key={item.id} headingLevel={headingLevel}/>
      )}
    </LoadMoreList>
  )
}

export default CardViewGrid;