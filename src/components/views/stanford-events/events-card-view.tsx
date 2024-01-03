import CardViewGrid from "@components/views/card-view-grid";
import {EventNodeType} from "@lib/types";

interface Props {
  headingLevel: string
  items?: EventNodeType[]
}
const EventsCardView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default EventsCardView;