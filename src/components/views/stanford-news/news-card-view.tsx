import CardViewGrid from "@components/views/card-view-grid";
import {NodeStanfordNews} from "@lib/gql/__generated__/drupal";

interface Props {
  headingLevel: string
  items?: NodeStanfordNews[]
}

const NewsCardView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default NewsCardView;