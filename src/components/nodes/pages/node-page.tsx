import {DrupalNode} from "next-drupal";
import StanfordPagePage from "@/components/nodes/pages/stanford-page/stanford-page-page";
import StanfordPersonPage from "@/components/nodes/pages/stanford-person/stanford-person-page";
import StanfordEventPage from "@/components/nodes/pages/stanford-event/stanford-event-page";
import StanfordNewsPage from "@/components/nodes/pages/stanford-news/stanford-news-page";
import StanfordPolicyPage from "@/components/nodes/pages/stanford-policy/stanford-policy-page";
import StanfordPublicationPage from "@/components/nodes/pages/stanford-publication/stanford-publication-page";
import StanfordCoursePage from "@/components/nodes/pages/stanford-course/stanford-course-page";
import StanfordEventSeriesPage from "@/components/nodes/pages/stanford-event-series/stanford-event-series-page";

const NodePage = ({node}: { node: DrupalNode }) => {
  switch (node.type) {
    case 'node--stanford_course':
      return <StanfordCoursePage node={node}/>
    case 'node--stanford_event':
      return <StanfordEventPage node={node}/>
    case 'node--stanford_event_series':
      return <StanfordEventSeriesPage node={node}/>
    case 'node--stanford_news':
      return <StanfordNewsPage node={node}/>
    case 'node--stanford_page':
      return <StanfordPagePage node={node}/>
    case 'node--stanford_person':
      return <StanfordPersonPage node={node}/>
    case 'node--stanford_policy':
      return <StanfordPolicyPage node={node}/>
    case 'node--stanford_publication':
      return <StanfordPublicationPage node={node}/>
  }
}
export default NodePage;