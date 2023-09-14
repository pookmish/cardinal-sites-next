import {BasicPageNodeType} from "@lib/types";
import {getViewItems} from "@components/views/view";
import StanfordPageCard from "@components/nodes/cards/stanford-page/stanford-page-card";
import CardViewGrid from "@components/views/card-view-grid";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
  emptyMessage?: string
  headingLevel: string
}

const PageCardView = async ({view, args, itemsToDisplay, emptyMessage, headingLevel}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<BasicPageNodeType>(view, itemsToDisplay, args.split('/'));
  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }

  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default PageCardView;