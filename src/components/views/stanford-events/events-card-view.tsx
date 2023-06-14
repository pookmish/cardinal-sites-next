import StanfordEventCard from "@/components/nodes/cards/stanford-event/stanford-event-card";
import {EventNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";
import CardViewGrid from "@/components/views/card-view-grid";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
  emptyMessage?: string
  headingLevel: string
}

const EventsCardView = async ({view, args, itemsToDisplay, emptyMessage, headingLevel}: Props) => {

  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<EventNodeType>(view, itemsToDisplay, args.split('/'));
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
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default EventsCardView;