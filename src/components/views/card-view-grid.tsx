import NodeCard from "@components/nodes/cards/node-card";
import LoadMoreList from "@components/elements/load-more-list";
import {StanfordNode} from "@lib/types";

const CardViewGrid = ({items, headingLevel}: { items: StanfordNode[], headingLevel: string }) => {
  return (
    <LoadMoreList
      ulProps={{className: "list-unstyled grid 3xl:grid-cols-3 gap-20"}}
      liProps={{className: ""}}
    >
      {items.map(item =>
        <NodeCard node={item} key={item.id} headingLevel={headingLevel}/>
      )}
    </LoadMoreList>
  )
}

export default CardViewGrid;