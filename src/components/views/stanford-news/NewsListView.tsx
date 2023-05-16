import StanfordNewsListItem from "@/components/nodes/list-item/stanford-news/stanford-news-list-item";

const NewsListView = ({items}) => {
  return (
    <div className="mb-20">
      {items.map(item =>
        <div
          key={item.id}
          className="border-b border-black-20 last:border-0"
        >
          <StanfordNewsListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default NewsListView;