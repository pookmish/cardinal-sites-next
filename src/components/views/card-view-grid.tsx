import NodeCard from "@components/nodes/cards/node-card";
import LoadMoreList from "@components/elements/load-more-list";
import {StanfordNode} from "@lib/types";

const CardViewGrid = ({items, headingLevel}: { items: StanfordNode[], headingLevel: string }) => {
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