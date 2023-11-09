import StanfordCourseListItem from "@components/nodes/list-item/stanford-course/stanford-course-list-item";
import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";
import StanfordEventSeriesListItem
  from "@components/nodes/list-item/stanford-event-series/stanford-event-series-list-item";
import StanfordNewsListItem from "@components/nodes/list-item/stanford-news/stanford-news-list-item";
import StanfordPageListItem from "@components/nodes/list-item/stanford-page/stanford-page-list-item";
import StanfordPersonListItem from "@components/nodes/list-item/stanford-person/stanford-person-list-item";
import StanfordPolicyListItem from "@components/nodes/list-item/stanford-policy/stanford-policy-list-item";
import StanfordPublicationListItem
  from "@components/nodes/list-item/stanford-publication/stanford-publication-list-item";
import {
  BasicPageNodeType,
  CourseNodeType,
  EventNodeType,
  EventSeriesNodeType,
  NewsNodeType,
  PersonNodeType, PolicyNodeType, PublicationNodeType, StanfordNode
} from "@lib/types";

const NodeListItem = ({node, headingLevel}: { node: StanfordNode, headingLevel?: string }) => {
  switch (node.type) {
    case 'node--stanford_course':
      return <StanfordCourseListItem node={node as CourseNodeType} headingLevel={headingLevel}/>
    case 'node--stanford_event':
      return <StanfordEventListItem node={node as EventNodeType} headingLevel={headingLevel}/>
    case 'node--stanford_event_series':
      return <StanfordEventSeriesListItem node={node as EventSeriesNodeType} headingLevel={headingLevel}/>
    case 'node--stanford_news':
      return <StanfordNewsListItem node={node as NewsNodeType} headingLevel={headingLevel}/>
    case 'node--stanford_page':
      return <StanfordPageListItem node={node as BasicPageNodeType} headingLevel={headingLevel}/>
    case 'node--stanford_person':
      return <StanfordPersonListItem node={node as PersonNodeType} headingLevel={headingLevel}/>
    case 'node--stanford_policy':
      return <StanfordPolicyListItem node={node as PolicyNodeType} headingLevel={headingLevel}/>
    case 'node--stanford_publication':
      return <StanfordPublicationListItem node={node as PublicationNodeType} headingLevel={headingLevel}/>
  }
}
export default NodeListItem;