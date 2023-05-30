import {BasicPageNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";
import StanfordPageCard from "@/components/nodes/cards/stanford-page/stanford-page-card";
import CardViewGrid from "@/components/views/card-view-grid";

interface Props {
  view: string
  args?: string
  itemsToDisplay?: number
  emptyMessage?: string
}

const PageCardView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<BasicPageNodeType>(view, itemsToDisplay, args.split('/'));
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
export default PageCardView;