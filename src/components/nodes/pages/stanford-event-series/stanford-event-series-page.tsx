import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";
import {H1} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {EventSeriesNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: EventSeriesNodeType
  headingLevel?: string
}

const StanfordEventSeriesPage = ({node, ...props}: Props) => {
  return (
    <article className="centered" {...props}>
      <H1 className="mt-32">
        {node.title}
      </H1>

      {node.su_event_series_dek &&
        <div className="text-m3 font-bold mb-20">
          {node.su_event_series_dek}
        </div>
      }
      {node.su_event_series_subheadline &&
        <div>
          {node.su_event_series_subheadline}
        </div>
      }
      {node.su_event_series_event &&
        <div className="mb-20">
          {node.su_event_series_event.map(event =>
            <div key={event.id} className="border-b last:border-0 border-black-20 py-20">
              <StanfordEventListItem node={event}/>
            </div>
          )}
        </div>
      }
    </article>
  )
}
export default StanfordEventSeriesPage;