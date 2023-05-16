import StanfordEventCard from "@/components/nodes/cards/stanford-event/stanford-event-card";

const EventsCardView = ({items}) => {
  return (
    <div className="@container">
      <div className="grid @4xl:grid-cols-2 @6xl:grid-cols-3 gap-20">
        {items.map(item =>
          <StanfordEventCard node={item} key={item.id}/>
        )}
      </div>
    </div>
  )
}
export default EventsCardView;