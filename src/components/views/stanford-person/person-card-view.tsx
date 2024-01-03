import CardViewGrid from "@components/views/card-view-grid";
import {NodeStanfordPerson, Maybe} from "@lib/gql/__generated__/drupal";

interface Props {
  emptyMessage?: Maybe<string>
  headingLevel: string
  items?: NodeStanfordPerson[]
}

const PersonCardView = async ({items = [], emptyMessage, headingLevel}: Props) => {
  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default PersonCardView;