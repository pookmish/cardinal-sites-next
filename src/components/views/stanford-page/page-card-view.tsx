import {BasicPageNodeType} from "@/lib/types";
import {getViewItems} from "@/components/views/view";
import StanfordPageCard from "@/components/nodes/cards/stanford-page/stanford-page-card";

interface Props {
  view: string
  args?: string
  itemsToDisplay?: number
  emptyMessage?: string
}

const PageCardView = async ({view,args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<BasicPageNodeType[]>({
    view: view,
    itemsToDisplay: itemsToDisplay,
    args: args.split('/')
  });
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
    <div className="flex flex-wrap justify-between gap-20">
      {items.map(item =>
        <div key={item.id} className="flex-1 min-w-[250px]">
          <StanfordPageCard node={item} key={item.id}/>
        </div>
      )}
    </div>
  )
}
export default PageCardView;