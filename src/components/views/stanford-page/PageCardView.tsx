import StanfordPageCard from "@/components/nodes/cards/stanford-page/stanford-page-card";

const PageCardView = ({items}) => {
  return (
    <div className="@container">
      <div className="grid @3xl:grid-cols-2 @6xl:grid-cols-3 gap-20">
        {items.map(item =>
          <StanfordPageCard node={item} key={item.id}/>
        )}
      </div>
    </div>
  )
}
export default PageCardView;