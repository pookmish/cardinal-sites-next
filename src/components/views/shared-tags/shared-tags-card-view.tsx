import NodeCard from "@/components/nodes/cards/node-card";
import {getViewItems} from "@/components/views/view";
import {DrupalNode} from "next-drupal";
import CardViewGrid from "@/components/views/card-view-grid";

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
    <CardViewGrid items={items}/>
  )
}
export default SharedTagsCardView;