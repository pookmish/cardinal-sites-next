import StanfordNewsListItem from "@components/nodes/list-item/stanford-news/stanford-news-list-item";
import {NewsNodeType} from "@lib/types";
import {getViewItems} from "@components/views/view";
import LoadMoreList from "@components/elements/load-more-list";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
  emptyMessage?: string
  headingLevel: string
}

const NewsListView = async ({view, args, itemsToDisplay = 999, emptyMessage, headingLevel}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<NewsNodeType>(view, itemsToDisplay, args.split('/'));

  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }


  return (
    <LoadMoreList
      listProps={{className: "list-unstyled mb-20"}}
      itemProps={{className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0"}}
    >
      {items.map(item =>
        <StanfordNewsListItem key={item.id} node={item} headingLevel={headingLevel}/>
      )}
    </LoadMoreList>
  )
}
export default NewsListView;