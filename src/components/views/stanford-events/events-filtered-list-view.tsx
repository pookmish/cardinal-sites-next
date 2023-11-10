"use client";

import {getTaxonomyTree} from "@lib/drupal/get-taxonomy-tree";
import Button from "@components/elements/button";
import SelectList from "@components/elements/select-list";
import {useMemo, useState} from "react";
import LoadMoreList from "@components/elements/load-more-list";
import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";
import {EventNodeType} from "@lib/types";
import {DrupalTaxonomyTerm} from "@lib/types";
import {SelectOptionDefinition, SelectValue} from "@mui/base/useSelect";

const getTopicOptions = (eventItems: EventNodeType[] = [], topicTree: DrupalTaxonomyTerm[] = []): SelectOptionDefinition<string>[] => {
  const topicOptions: SelectOptionDefinition<string>[] = [];

  const cleanTopic = (topic: DrupalTaxonomyTerm): boolean => {
    if (topic.below) {
      topic.below = topic.below.filter(childTopic => cleanTopic(childTopic));
    }
    if (!topic.below?.length) return true;

    return !!eventItems.find(event => {
      return event.su_event_type?.map(eventTerm => eventTerm.id).includes(topic.id);
    });
  }
  topicTree = topicTree.filter(topic => cleanTopic(topic));

  topicTree.map(topic => {
    topicOptions.push({value: topic.id, label: topic.name})
  })
  return topicOptions.sort((a, b) => a.label < b.label ? -1 : (a.label > b.label ? 1 : 0));
}

const EventsFilteredListView = ({items, topics}: { items: EventNodeType[], topics: DrupalTaxonomyTerm[] }) => {
  const [chosenTopic, setChosenTopic] = useState<string>('');
  const [displayedEvents, setDisplayedEvents] = useState<EventNodeType[]>(items);

  const topicTree = useMemo(() => getTaxonomyTree(topics), [topics]);
  const topicOptions = useMemo(() => getTopicOptions(items, topicTree), [topics]);

  const filterEvents = () => {

    if (!chosenTopic) {
      setDisplayedEvents(items);
      return;
    }
    const topicIds: string[] = [];

    const buildChosenTopicIds = (topicTerm: DrupalTaxonomyTerm | undefined): void => {
      if (!topicTerm) return;

      topicIds.push(topicTerm.id);
      topicTerm.below?.map(belowTerm => buildChosenTopicIds(belowTerm));
    }

    buildChosenTopicIds(topicTree.find(term => term.id === chosenTopic));

    const matchingEvents = items.filter(event => {
      const eventTopics = event.su_event_type?.map(eventTerm => eventTerm.id)
      return topicIds.filter(value => eventTopics?.includes(value)).length > 0;
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
            onChange={(e, value: SelectValue<string, boolean>) => setChosenTopic(value as string || '')}
          />
        </div>
        <Button onClick={filterEvents}>Filter</Button>
      </form>
      <div aria-live="polite">Showing {displayedEvents.length} of {items.length} events.</div>
      <LoadMoreList
        key={displayedEvents.map(event => event.id).join(',')}
        buttonText={<>Load More<span className="sr-only">&nbsp;Events</span></>}
        listProps={{className: "list-unstyled mb-20"}}
        itemProps={{className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0"}}
        itemsPerPage={3}
      >
        {displayedEvents.map(event => <StanfordEventListItem key={event.id} node={event}/>)}
      </LoadMoreList>
    </div>
  )
}

export default EventsFilteredListView;