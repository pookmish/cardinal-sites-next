import StanfordEventListItem from "@/components/nodes/list-item/stanford-event/stanford-event-list-item";

const EventsListView = ({items}) => {
  return (
    <div className="mb-20">
      {items.map(item =>
        <div
          key={item.id}
          className="border-b border-black-20 last:border-0"
        >
          <StanfordEventListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default EventsListView;