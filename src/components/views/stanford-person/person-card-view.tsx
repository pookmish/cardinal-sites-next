import StanfordPersonCard from "@/components/nodes/cards/stanford-person/stanford-person-card";
import {PersonNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";
import CardViewGrid from "@/components/views/card-view-grid";

interface Props {
  view: string
  args?: string
  itemsToDisplay: number
  emptyMessage?: string
  headingLevel: string
}

const PersonCardView = async ({view, args, itemsToDisplay, emptyMessage, headingLevel}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<PersonNodeType>(view, itemsToDisplay, args.split('/'));
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
export default PersonCardView;