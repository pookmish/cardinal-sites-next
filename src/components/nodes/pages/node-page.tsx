import StanfordPagePage from "@components/nodes/pages/stanford-page/stanford-page-page";
import StanfordPersonPage from "@components/nodes/pages/stanford-person/stanford-person-page";
import StanfordEventPage from "@components/nodes/pages/stanford-event/stanford-event-page";
import StanfordNewsPage from "@components/nodes/pages/stanford-news/stanford-news-page";
import StanfordPolicyPage from "@components/nodes/pages/stanford-policy/stanford-policy-page";
import StanfordPublicationPage from "@components/nodes/pages/stanford-publication/stanford-publication-page";
import StanfordCoursePage from "@components/nodes/pages/stanford-course/stanford-course-page";
import StanfordEventSeriesPage from "@components/nodes/pages/stanford-event-series/stanford-event-series-page";
import {StanfordNode} from "@lib/types";
import {isDraftMode} from "@lib/drupal/utils";

const NodePage = ({node}: { node: StanfordNode }) => {
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

const Node = ({node}: { node: StanfordNode }) => {
  const draftMode = isDraftMode();
  const itemProps: { [key: string]: string } = {};
  if (draftMode) {
    itemProps['data-type'] = node.type;
    itemProps['data-id'] = node.id;
  }

  switch (node.type) {
    case 'node--stanford_course':
      return <StanfordCoursePage node={node} {...itemProps}/>
    case 'node--stanford_event':
      return <StanfordEventPage node={node} {...itemProps}/>
    case 'node--stanford_event_series':
      return <StanfordEventSeriesPage node={node} {...itemProps}/>
    case 'node--stanford_news':
      return <StanfordNewsPage node={node} {...itemProps}/>
    case 'node--stanford_page':
      return <StanfordPagePage node={node} {...itemProps}/>
    case 'node--stanford_person':
      return <StanfordPersonPage node={node} {...itemProps}/>
    case 'node--stanford_policy':
      return <StanfordPolicyPage node={node} {...itemProps}/>
    case 'node--stanford_publication':
      return <StanfordPublicationPage node={node} {...itemProps}/>
  }
}
export default NodePage;