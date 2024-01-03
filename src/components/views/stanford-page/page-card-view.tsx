import CardViewGrid from "@components/views/card-view-grid";
import {BasicPageNodeType} from "@lib/types";

interface Props {
  headingLevel: string
  items?: BasicPageNodeType[]
}

const PageCardView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default PageCardView;