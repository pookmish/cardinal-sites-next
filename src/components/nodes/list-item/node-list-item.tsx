import {DrupalNode} from "next-drupal";
import StanfordCourseListItem from "@/components/nodes/list-item/stanford-course/stanford-course-list-item";
import StanfordEventListItem from "@/components/nodes/list-item/stanford-event/stanford-event-list-item";
import StanfordEventSeriesListItem
  from "@/components/nodes/list-item/stanford-event-series/stanford-event-series-list-item";
import StanfordNewsListItem from "@/components/nodes/list-item/stanford-news/stanford-news-list-item";
import StanfordPageListItem from "@/components/nodes/list-item/stanford-page/stanford-page-list-item";
import StanfordPersonListItem from "@/components/nodes/list-item/stanford-person/stanford-person-list-item";
import StanfordPolicyListItem from "@/components/nodes/list-item/stanford-policy/stanford-policy-list-item";
import StanfordPublicationListItem
  from "@/components/nodes/list-item/stanford-publication/stanford-publication-list-item";
import {
  BasicPageNodeType,
  CourseNodeType,
  EventNodeType,
  EventSeriesNodeType,
  NewsNodeType,
  PersonNodeType, PolicyNodeType, PublicationNodeType
} from "@/lib/types";

const NodeListItem = ({node}: { node: DrupalNode }) => {
  switch (node.type) {
    case 'node--stanford_course':
      return <StanfordCourseListItem node={node as CourseNodeType}/>
    case 'node--stanford_event':
      return <StanfordEventListItem node={node as EventNodeType}/>
    case 'node--stanford_event_series':
      return <StanfordEventSeriesListItem node={node as EventSeriesNodeType}/>
    case 'node--stanford_news':
      return <StanfordNewsListItem node={node as NewsNodeType}/>
    case 'node--stanford_page':
      return <StanfordPageListItem node={node as BasicPageNodeType}/>
    case 'node--stanford_person':
      return <StanfordPersonListItem node={node as PersonNodeType}/>
    case 'node--stanford_policy':
      return <StanfordPolicyListItem node={node as PolicyNodeType}/>
    case 'node--stanford_publication':
      return <StanfordPublicationListItem node={node as PublicationNodeType}/>
  }
}
export default NodeListItem;