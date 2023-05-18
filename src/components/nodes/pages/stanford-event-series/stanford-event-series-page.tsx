import {EventNodeType, EventSeriesNodeType} from "@/lib/types";
import StanfordEventListItem from "@/components/nodes/list-item/stanford-event/stanford-event-list-item";

const StanfordEventSeriesPage = ({node}: { node: EventSeriesNodeType }) => {
  return (
    <div className="cc">
      <h1 className="mt-32">{node.title}</h1>

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
          <StanfordEventListItem node={event as EventNodeType} />
          </div>
        )}
      </div>
      }
    </div>
  )
}
export default StanfordEventSeriesPage;