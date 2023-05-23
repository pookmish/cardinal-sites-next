import StanfordPageListItem from "@/components/nodes/list-item/stanford-page/stanford-page-list-item";
import {getViewItems} from "@/components/views/view";
import {DrupalNode} from "next-drupal";

interface Props {
  view: string
  args?: string
  itemsToDisplay?: number
  emptyMessage?: string
}

const PageListView = async ({view,args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

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
    <div>
      {items.map(item =>
        <div
          key={item.id}
          className="border-b border-black-20 last:border-0 pb-10 last:pb-0 pt-10 first:pt-0"
        >
          <StanfordPageListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default PageListView;