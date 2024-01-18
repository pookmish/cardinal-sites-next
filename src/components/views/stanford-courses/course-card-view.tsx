import CardViewGrid from "@components/views/card-view-grid";
import {NodeStanfordCourse} from "@lib/gql/__generated__/drupal";

interface Props {
  headingLevel: string
  items?: NodeStanfordCourse[]
}

const CourseCardView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default CourseCardView;