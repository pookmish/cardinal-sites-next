import NodeCard from "@/components/nodes/cards/node-card";
import {getViewItems} from "@/components/views/view";
import {DrupalNode} from "next-drupal";

interface Props {
  view: string
  args?: string
  itemsToDisplay?: number
  emptyMessage?: string
}

const SharedTagsCardView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args : '';

  const items = await getViewItems<DrupalNode>(view, itemsToDisplay, args.split('/'));

  if (items.length === 0) {
    if (emptyMessage) {
      return (
        <div>
          {emptyMessage}
        </div>
      )
    }
    return null;
  }

  return (
    <div className="flex flex-wrap justify-between gap-20">
      {items.map(item =>
        <div key={item.id} className="flex-1 min-w-[250px]">
          <NodeCard node={item} key={item.id}/>
        </div>
      )}
    </div>
  )
}
export default SharedTagsCardView;