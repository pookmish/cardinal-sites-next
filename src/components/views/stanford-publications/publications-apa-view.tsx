import CardViewGrid from "@components/views/card-view-grid";
import {NodeStanfordPublication, Maybe} from "@lib/gql/__generated__/drupal";

interface Props {
  emptyMessage?: Maybe<string>
  headingLevel: string
  items?: NodeStanfordPublication[]
}

const PublicationsApaView = async ({items = [], emptyMessage, headingLevel}: Props) => {
  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default PublicationsApaView;