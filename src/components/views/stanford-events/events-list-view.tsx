import StanfordEventListItem from "@/components/nodes/list-item/stanford-event/stanford-event-list-item";
import {EventNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";

interface Props {
  view: string
  args?: string
  itemsToDisplay?: number
  emptyMessage?: string
}

const EventsListView = async ({view,args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<EventNodeType[]>({
    view: view,
    itemsToDisplay: itemsToDisplay,
    args: args.split('/')
  });

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
    <div className="mb-20">
      {items.map(item =>
        <div
          key={item.id}
          className="border-b border-black-20 last:border-0 pb-10 last:pb-0 pt-10 first:pt-0"
        >
          <StanfordEventListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default EventsListView;