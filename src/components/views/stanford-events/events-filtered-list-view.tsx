"use client";

import {getTaxonomyTree} from "@lib/drupal/get-taxonomy-tree";
import Button from "@components/elements/button";
import SelectList from "@components/elements/select-list";
import {useState} from "react";
import LoadMoreList from "@components/elements/load-more-list";
import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";


const EventsFilteredListView = ({items, topics}) => {
  const [chosenTopic, setChosenTopic] = useState('');
  const [displayedEvents, setDisplayedEvents] = useState(items);

  const topicTree = getTaxonomyTree(topics)
  const topicOptions = [];
  topicTree.map(topic => {
    topicOptions.push({value: topic.id, label: topic.name})
  })

  const filterEvents = () => {

    if (!chosenTopic) {
      setDisplayedEvents(items);
      return;
    }
    const topicIds = [];
    const getTopicIds = (topicTerm) => {
      topicIds.push(topicTerm.id);
      topicTerm.below?.map(belowTerm => getTopicIds(belowTerm));
    }
    getTopicIds(topicTree.find(term => term.id === chosenTopic));
    const matchingEvents = items.filter(event => {
      const eventTopics = event.su_event_type.map(eventTerm => eventTerm.id)
      return topicIds.filter(value => eventTopics.includes(value)).length > 0;
    });
    setDisplayedEvents(matchingEvents);
  }

  return (
    <div>
      <form className="mb-10">
        <div className="mb-5">
        <SelectList
          options={topicOptions}
          label="Event Topics"
          onChange={(e, value) => setChosenTopic(value)}
        />
        </div>
        <Button onClick={filterEvents}>Filter</Button>
      </form>
      <div className="sr-only" aria-live="polite">Showing {displayedEvents.length} of {items.length} events.</div>
      <LoadMoreList
        buttonText={<>Load More<span className="sr-only">&nbsp;Events</span></>}
        listProps={{className: "list-unstyled mb-20"}}
        itemProps={{className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0"}}
      >
        {displayedEvents.map(event => <StanfordEventListItem key={event.id} node={event}/>)}
      </LoadMoreList>
    </div>
  )
}

export default EventsFilteredListView;