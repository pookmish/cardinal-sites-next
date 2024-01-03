import CardViewGrid from "@components/views/card-view-grid";
import {NewsNodeType} from "@lib/types";

interface Props {
  headingLevel: string
  items?: NewsNodeType[]
}

const NewsCardView = async ({items = [],  headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default NewsCardView;