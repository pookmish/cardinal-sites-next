import Link from "@components/elements/link";
import {H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from 'react';
import {CourseNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: CourseNodeType
  headingLevel?: string
}

const StanfordCourseCard = ({node, headingLevel, ...props}: Props) => {
  const Heading = headingLevel === 'h3' ? H3 : H2;
  return (
    <article aria-labelledby={node.id} className="mx-auto shadow-xl border border-black-20 p-10 overflow-hidden" {...props}>
      <div className="flex flex-col">
        <Heading className="text-m2 order-last" id={node.id}>
          <Link href={node.path.alias}>
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
    </article>
  )
}
export default StanfordCourseCard;