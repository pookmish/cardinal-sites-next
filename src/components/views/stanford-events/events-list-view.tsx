import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";
import {EventNodeType} from "@lib/types";
import {getViewItems} from "@components/views/view";
import LoadMoreList from "@components/elements/load-more-list";
import EventsFilteredListView from "@components/views/stanford-events/events-filtered-list-view";
import {getResourceCollection} from "@lib/drupal/get-resource";
import {DrupalTaxonomyTerm} from "@lib/types";
import {trimNodeData} from "@lib/drupal/utils";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
  emptyMessage?: string
  headingLevel: string
}

const EventsListView = async ({view, args, itemsToDisplay, emptyMessage, headingLevel}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const viewItems = await getViewItems<EventNodeType>(view, itemsToDisplay, args.split('/'));
  const items = trimNodeData<EventNodeType[]>(viewItems, ['su_event_date_time', 'su_event_source', 'su_event_type', 'su_event_subheadline', 'su_event_location', 'su_event_alt_loc']);

  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }

  if (items.length >= 5) {
    const topics = await getResourceCollection<DrupalTaxonomyTerm[]>('taxonomy_term--stanford_event_types');
    topics.map(topic => ({id: topic.id, name: topic.name, parent: topic.parent}))
    return <EventsFilteredListView items={items} topics={topics}/>
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