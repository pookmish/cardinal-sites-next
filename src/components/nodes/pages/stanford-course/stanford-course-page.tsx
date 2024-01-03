import {redirect} from "next/navigation";
import Wysiwyg from "@components/elements/wysiwyg";
import {H1} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {CourseNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: CourseNodeType
  headingLevel?: string
}

const StanfordCoursePage = ({node, ...props}: Props) => {
  if (node.su_course_link?.url) redirect(node.su_course_link?.url);
  return (
    <article className="centered my-32" {...props}>
      <H1>
        {node.title}
      </H1>
      <div className="flex flex-col gap-10">
        {node.su_course_subject &&
          <div>{node.su_course_subject.name}</div>
        }

        {node.su_course_code &&
          <div>{node.su_course_code}</div>
        }

        {node.body &&
          <Wysiwyg html={node.body}/>
        }

        {node.su_course_tags &&
          <div>
            {node.su_course_tags.map(tag =>
              <div key={tag.id}>{tag.name}</div>
            )}
          </div>
        }

        {node.su_course_quarters &&
          <div>
            {node.su_course_quarters.map(quarter =>
              <div key={quarter.id}>{quarter.name}</div>
            )}
          </div>
        }

        {node.su_course_instructors &&
          <div>
            {node.su_course_instructors.map((instructor, i) =>
              <div key={`instructor-${i}`}>{instructor}</div>
            )}
          </div>
        }
      </div>
    </article>
  )
}
export default StanfordCoursePage;