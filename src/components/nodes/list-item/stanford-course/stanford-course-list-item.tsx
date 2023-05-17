import {CourseNodeType} from "@/lib/types";
import Link from "@/components/elements/link";

const StanfordCourseListItem = ({node}: { node: CourseNodeType }) => {
  return (
    <div className="">
      <Link href={node.path}
            className="text-digital-red no-underline hocus:text-black hocus:underline">
        <h3 className=" text-m2">{node.title}</h3>
      </Link>
      {node.su_course_instructors &&
        <div>
          <span className="font-bold">Instructor(s): </span>
          {node.su_course_instructors.map((instructor, i) =>
            <span key={`${node.id}-instructor-${i}`}>{instructor}</span>
          )}
        </div>

      }
    </div>
  )
}
export default StanfordCourseListItem;