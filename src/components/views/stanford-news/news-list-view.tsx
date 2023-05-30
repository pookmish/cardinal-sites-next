import StanfordNewsListItem from "@/components/nodes/list-item/stanford-news/stanford-news-list-item";
import {NewsNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";

interface Props {
  view: string
  args?: string
  itemsToDisplay?: number
  emptyMessage?: string
}

const NewsListView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<NewsNodeType>(view, itemsToDisplay, args.split('/'));
  if (items.length === 0) {
    if (emptyMessage) {
      return (
        <div>
          {emptyMessage}
        </div>
      )
    }
    return null;
  }

  return (
    <ul className="list-unstyled mb-20">
      {items.map(item =>
        <li
          key={item.id}
          className="border-b border-black-20 last:border-0 pb-10 last:pb-0 pt-10 first:pt-0"
        >
          <StanfordNewsListItem node={item}/>
        </li>
      )}
    </ul>
  )
}
export default NewsListView;