import {DrupalNode} from "next-drupal";
import StanfordPagePage from "@components/nodes/pages/stanford-page/stanford-page-page";
import StanfordPersonPage from "@components/nodes/pages/stanford-person/stanford-person-page";
import StanfordEventPage from "@components/nodes/pages/stanford-event/stanford-event-page";
import StanfordNewsPage from "@components/nodes/pages/stanford-news/stanford-news-page";
import StanfordPolicyPage from "@components/nodes/pages/stanford-policy/stanford-policy-page";
import StanfordPublicationPage from "@components/nodes/pages/stanford-publication/stanford-publication-page";
import StanfordCoursePage from "@components/nodes/pages/stanford-course/stanford-course-page";
import StanfordEventSeriesPage from "@components/nodes/pages/stanford-event-series/stanford-event-series-page";
import {
  BasicPageNodeType,
  CourseNodeType,
  EventNodeType,
  EventSeriesNodeType,
  NewsNodeType,
  PersonNodeType, PolicyNodeType, PublicationNodeType
} from "@lib/types";

const NodePage = ({node}: { node: DrupalNode }) => {
  return (
    <>
      {!node.status &&
        <div className="bg-illuminating text-4xl p-5">
          <div className="centered-container">
            Unpublished Page
          </div>
        </div>
      }
      <Node node={node}/>
    </>
  )
}

const Node = ({node}: { node: DrupalNode }) => {
  switch (node.type) {
    case 'node--stanford_course':
      return <StanfordCoursePage node={node as CourseNodeType}/>
    case 'node--stanford_event':
      return <StanfordEventPage node={node as EventNodeType}/>
    case 'node--stanford_event_series':
      return <StanfordEventSeriesPage node={node as EventSeriesNodeType}/>
    case 'node--stanford_news':
      return <StanfordNewsPage node={node as NewsNodeType}/>
    case 'node--stanford_page':
      return <StanfordPagePage node={node as BasicPageNodeType}/>
    case 'node--stanford_person':
      return <StanfordPersonPage node={node as PersonNodeType}/>
    case 'node--stanford_policy':
      return <StanfordPolicyPage node={node as PolicyNodeType}/>
    case 'node--stanford_publication':
      return <StanfordPublicationPage node={node as PublicationNodeType}/>
  }
}
export default NodePage;