import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";
import {EventNodeType} from "@lib/types";
import {getViewItems} from "@components/views/view";
import LoadMoreList from "@components/elements/load-more-list";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
  emptyMessage?: string
  headingLevel: string
}

const EventsListView = async ({view, args, itemsToDisplay, emptyMessage, headingLevel}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<EventNodeType>(view, itemsToDisplay, args.split('/'));

  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }

  return (
    <LoadMoreList
      buttonText={<>Load More<span className="sr-only">&nbsp;Events</span></>}
      listProps={{className: "list-unstyled mb-20"}}
      itemProps={{className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0"}}
    >
      {items.map(item =>
        <StanfordEventListItem key={item.id} node={item} headingLevel={headingLevel}/>
      )}
    </LoadMoreList>
  )
}
export default EventsListView;