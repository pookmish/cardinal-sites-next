import CardViewGrid from "@components/views/card-view-grid";
import {CourseNodeType} from "@lib/types";

interface Props {
  headingLevel: string
  items?: CourseNodeType[]
}

const CourseCardView = async ({items = [], headingLevel}: Props) => {
  return (
    <CardViewGrid items={items} headingLevel={headingLevel}/>
  )
}
export default CourseCardView;