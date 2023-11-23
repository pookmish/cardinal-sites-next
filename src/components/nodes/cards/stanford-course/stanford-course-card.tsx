import {CourseNodeType} from "@lib/types";
import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {PropsWithoutRef} from "react";

const StanfordCourseCard = ({node, headingLevel, ...props}: PropsWithoutRef<{ node: CourseNodeType, headingLevel?: string }>) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <div className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10 overflow-hidden" {...props}>
      <div className="flex flex-col">
        <Heading className="text-m2 order-last">
          <Link href={node.path?.alias} >
            {node.title}
          </Link>
        </Heading>
        <div className="order-first flex gap-5">
          {node.su_course_subject &&
            <div className="font-bold">{node.su_course_subject.name}{node.su_course_code}</div>
          }
          {(node.su_course_subject && node.su_course_academic_year) && <> | </>}
          <div>{node.su_course_academic_year}</div>
        </div>
      </div>
    </div>
  )
}
export default StanfordCourseCard;