import {DrupalNode} from "next-drupal";
import NodeCard from "@/components/nodes/cards/node-card";

const CardViewGrid = ({items}: { items: DrupalNode[] }) => {
  return (
    <ul className="list-unstyled flex flex-wrap justify-between gap-20">
      {items.map(item =>
        <li key={item.id} className="flex-1 min-w-[250px] lg:min-w-[350px]">
          <NodeCard node={item} key={item.id}/>
        </li>
      )}
    </ul>
  )
}

export default CardViewGrid;