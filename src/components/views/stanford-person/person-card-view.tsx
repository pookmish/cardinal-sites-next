import CardViewGrid from "@components/views/card-view-grid";
import {PersonNodeType} from "@lib/types";

interface Props {
  headingLevel: string
  items?: PersonNodeType[]
}

const PersonCardView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default PersonCardView;