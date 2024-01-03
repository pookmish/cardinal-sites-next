import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";
import LoadMoreList from "@components/elements/load-more-list";
import EventsFilteredListView from "@components/views/stanford-events/events-filtered-list-view";
import {NodeStanfordEvent, TermUnion, Maybe} from "@lib/gql/__generated__/drupal";

interface Props {
  emptyMessage?: Maybe<string>
  headingLevel: string
  items?: NodeStanfordEvent[]
}

const EventsListView = async ({items = [], emptyMessage, headingLevel}: Props) => {

  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }

  if (items.length >= 5) {
    const topics: TermUnion[] = [];
    items.map(event => event.suEventType?.map(topic => topics.push(topic)))
    const uniqueTopics = [...new Map(topics.map((t) => [t.id, t])).values()];

    if (uniqueTopics.length > 1) {
      return <EventsFilteredListView items={items} topics={uniqueTopics}/>
    }
  }

  return (
    <LoadMoreList
      buttonText={<>Load More<span className="sr-only">&nbsp;Events</span></>}
      ulProps={{className: "list-unstyled mb-20"}}
      liProps={{className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0"}}
    >
      {items.map(item =>
        <StanfordEventListItem key={item.id} node={item} headingLevel={headingLevel}/>
      )}
    </LoadMoreList>
  )
}
export default EventsListView;