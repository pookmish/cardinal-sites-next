import CardViewGrid from "@components/views/card-view-grid";
import {NodeStanfordPublication} from "@lib/gql/__generated__/drupal";

interface Props {
  headingLevel: string
  items?: NodeStanfordPublication[]
}

const PublicationsApaView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default PublicationsApaView;