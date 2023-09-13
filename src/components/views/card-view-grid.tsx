import {DrupalNode} from "next-drupal";
import NodeCard from "@components/nodes/cards/node-card";
import PagedList from "@components/views/paged-list";

const CardViewGrid = ({items, headingLevel}: { items: DrupalNode[], headingLevel: string }) => {
  return (
    <ul className="list-unstyled flex flex-wrap justify-between gap-20">
      <PagedList itemProps={{className: "flex-1 min-w-[250px]"}}>
        {items.map(item =>
          <NodeCard node={item} key={item.id} headingLevel={headingLevel}/>
        )}
      </PagedList>
    </ul>
  )
}

export default CardViewGrid;