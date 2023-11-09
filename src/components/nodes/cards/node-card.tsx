import StanfordCourseCard from "@components/nodes/cards/stanford-course/stanford-course-card";
import StanfordEventCard from "@components/nodes/cards/stanford-event/stanford-event-card";
import StanfordEventSeriesCard from "@components/nodes/cards/stanford-event-series/stanford-event-series-card";
import StanfordNewsCard from "@components/nodes/cards/stanford-news/stanford-news-card";
import StanfordPageCard from "@components/nodes/cards/stanford-page/stanford-page-card";
import StanfordPersonCard from "@components/nodes/cards/stanford-person/stanford-person-card";
import StanfordPolicyCard from "@components/nodes/cards/stanford-policy/stanford-policy-card";
import StanfordPublicationCard from "@components/nodes/cards/stanford-publication/stanford-publication-card";
import {StanfordNode} from "@lib/types";
import {JSX} from "react";

const NodeCard = ({node, headingLevel}: { node: StanfordNode, headingLevel?: string }): JSX.Element | null => {
  switch (node.type) {
    case 'node--stanford_course':
      return <StanfordCourseCard node={node} headingLevel={headingLevel}/>
    case 'node--stanford_event':
      return <StanfordEventCard node={node} headingLevel={headingLevel}/>
    case 'node--stanford_event_series':
      return <StanfordEventSeriesCard node={node} headingLevel={headingLevel}/>
    case 'node--stanford_news':
      return <StanfordNewsCard node={node} headingLevel={headingLevel}/>
    case 'node--stanford_page':
      return <StanfordPageCard node={node} headingLevel={headingLevel}/>
    case 'node--stanford_person':
      return <StanfordPersonCard node={node} headingLevel={headingLevel}/>
    case 'node--stanford_policy':
      return <StanfordPolicyCard node={node} headingLevel={headingLevel}/>
    case 'node--stanford_publication':
      return <StanfordPublicationCard node={node} headingLevel={headingLevel}/>
  }
  return null;
}
export default NodeCard;