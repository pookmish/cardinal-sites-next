import {CourseNodeType} from "@lib/types";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {PropsWithoutRef} from "react";

const StanfordCourseListItem = ({node, headingLevel, ...props}: PropsWithoutRef<{ node: CourseNodeType, headingLevel?: string }>) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div  {...props}>
      <Heading className="text-m2">
        <Link href={node.path?.alias}>
          {node.title}
        </Link>
      </Heading>
      {node.su_course_instructors &&
        <div>
          <span className="font-bold">Instructor{node.su_course_instructors.length > 1 ? "s" : ""}: </span>
          {node.su_course_instructors.map((instructor, i) =>
            <span key={`${node.id}-instructor-${i}`}>{instructor}</span>
          )}
        </div>

      }
    </div>
  )
}
export default StanfordCourseListItem;