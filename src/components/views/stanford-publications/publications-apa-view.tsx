import CardViewGrid from "@components/views/card-view-grid";
import {PublicationNodeType} from "@lib/types";

interface Props {
  headingLevel: string
  items?: PublicationNodeType[]
}

const PublicationsApaView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default PublicationsApaView;