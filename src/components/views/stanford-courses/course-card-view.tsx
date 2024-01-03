import CardViewGrid from "@components/views/card-view-grid";
import {NodeStanfordCourse, Maybe} from "@lib/gql/__generated__/drupal";

interface Props {
  emptyMessage?: Maybe<string>
  headingLevel: string
  items?: NodeStanfordCourse[]
}

const CourseCardView = async ({items = [], emptyMessage, headingLevel}: Props) => {

  if (items.length === 0) {
    return emptyMessage ? <div>{emptyMessage}</div> : null;
  }

  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default CourseCardView;