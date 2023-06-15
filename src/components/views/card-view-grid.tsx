import {DrupalNode} from "next-drupal";
import NodeCard from "@components/nodes/cards/node-card";

const CardViewGrid = ({items, headingLevel}: { items: DrupalNode[], headingLevel: string }) => {
  return (
    <ul className="list-unstyled flex flex-wrap justify-between gap-20">
      {items.map(item =>
        <li key={item.id} className="flex-1 min-w-[250px]">
          <NodeCard node={item} key={item.id} headingLevel={headingLevel}/>
        </li>
      )}
    </ul>
  )
}

export default CardViewGrid;