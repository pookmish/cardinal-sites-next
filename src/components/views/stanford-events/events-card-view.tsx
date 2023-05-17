import StanfordEventCard from "@/components/nodes/cards/stanford-event/stanford-event-card";
import {EventNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";

interface Props {
  view: string
  args?: string
  itemsToDisplay?: number
  emptyMessage?: string
}

const EventsCardView = async ({view,args, itemsToDisplay, emptyMessage}: Props) => {

  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<EventNodeType[]>(view, itemsToDisplay, args.split('/'));
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
          <StanfordEventCard node={item} key={item.id}/>
        </div>
      )}
    </div>
  )
}
export default EventsCardView;