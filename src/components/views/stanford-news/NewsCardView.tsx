import StanfordNewsCard from "@/components/nodes/cards/stanford-news/stanford-news-card";

const NewsCardView = ({items}) => {
  return (
    <div className="@container">
      <div className="grid @3xl:grid-cols-2 @6xl:grid-cols-3 gap-20">
        {items.map(item =>
          <StanfordNewsCard node={item} key={item.id}/>
        )}
      </div>
    </div>
  )
}
export default NewsCardView;