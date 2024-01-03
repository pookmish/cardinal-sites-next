import CardViewGrid from "@components/views/card-view-grid";
import {StanfordNode} from "@lib/types";

interface Props {
  headingLevel: string
  items?: StanfordNode[]
}

const SharedTagsCardView = async ({items = [],headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default SharedTagsCardView;