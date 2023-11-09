import {getViewItems} from "@components/views/view";
import CardViewGrid from "@components/views/card-view-grid";
import {StanfordNode} from "@lib/types";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
  emptyMessage?: string
  headingLevel: string
}

const SharedTagsCardView = async ({view, args, itemsToDisplay, emptyMessage, headingLevel}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0';

  const items = await getViewItems<StanfordNode>(view, itemsToDisplay, args.split('/'));

  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }

  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default SharedTagsCardView;