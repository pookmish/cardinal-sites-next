import StanfordPageListItem from "@/components/nodes/list-item/stanford-page/stanford-page-list-item";

const PageListView = ({items}) => {
  return (
    <div>
      {items.map(item =>
        <div
          key={item.id}
          className="border-b border-black-20 last:border-0 mb-20"
        >
          <StanfordPageListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default PageListView;