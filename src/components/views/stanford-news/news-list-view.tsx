import StanfordNewsListItem from "@/components/nodes/list-item/stanford-news/stanford-news-list-item";
import {NewsNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";
import NewsFilteringListView from "@/components/views/stanford-news/news-filtering-list-view";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
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

  if (itemsToDisplay >= 99 && args === '0/0/0/0') {
    return (
      <NewsFilteringListView
        items={items.map(item => ({
          id: item.id,
          title: item.title,
          path: item.path,
          su_news_topics: item.su_news_topics,
          su_news_featured_media: item.su_news_featured_media,
          su_news_publishing_date: item.su_news_publishing_date
        }))}
      />
    )
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