import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";
import {EventNodeType} from "@lib/types";
import {getViewItems} from "@components/views/view";
import PagedList from "@components/views/paged-list";

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
    <ul className="list-unstyled mb-20">
      <PagedList
        itemProps={{className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0"}}
      >
        {items.map(item =>
          <StanfordEventListItem key={item.id} node={item} headingLevel={headingLevel}/>
        )}
      </PagedList>
    </ul>
  )
}
export default EventsListView;