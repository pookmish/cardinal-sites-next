import StanfordNewsCard from "@/components/nodes/cards/stanford-news/stanford-news-card";
import {NewsNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";
import CardViewGrid from "@/components/views/card-view-grid";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
  emptyMessage?: string
  headingLevel: string
}

const NewsCardView = async ({view, args, itemsToDisplay, emptyMessage, headingLevel}: Props) => {
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
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default NewsCardView;