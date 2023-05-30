import {PublicationNodeType} from "@/lib/types";
import StanfordCourseListItem from "@/components/nodes/list-item/stanford-course/stanford-course-list-item";
import {getViewItems} from "@/components/views/view";

interface Props {
  view: string
  args?: string
  itemsToDisplay?: number
  emptyMessage?: string
}

const PublicationsChicagoView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<PublicationNodeType>(view, itemsToDisplay, args.split('/'));
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
          <StanfordCourseListItem node={item}/>
        </li>
      )}
    </ul>
  )
}
export default PublicationsChicagoView;