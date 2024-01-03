import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {CourseNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: CourseNodeType
  headingLevel?: string
}

const StanfordCourseListItem = ({node, headingLevel, ...props}: Props) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} {...props}>
      <Heading className="text-m2" id={node.id}>
        <Link href={node.path.alias}>
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
    </article>
  )
}
export default StanfordCourseListItem;