import CardViewGrid from "@components/views/card-view-grid";
import {NodeStanfordPage} from "@lib/gql/__generated__/drupal";

interface Props {
  headingLevel: string
  items?: NodeStanfordPage[]
}

const PageCardView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default PageCardView;