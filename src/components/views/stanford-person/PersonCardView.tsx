import StanfordPersonCard from "@/components/nodes/cards/stanford-person/stanford-person-card";

const PersonCardView = ({items}) => {
  return (
    <div className="@container">
      <div className="grid @3xl:grid-cols-2 @6xl:grid-cols-3 gap-20">
        {items.map(item =>
          <StanfordPersonCard node={item} key={item.id}/>
        )}
      </div>
    </div>
  )
}
export default PersonCardView;