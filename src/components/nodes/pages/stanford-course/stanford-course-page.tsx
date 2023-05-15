import {redirect} from "next/navigation";
import {CourseNodeType} from "@/lib/types";

const StanfordCoursePage = ({node}: {node:CourseNodeType}) => {
  redirect(node.su_course_link.url);
}
export default StanfordCoursePage;