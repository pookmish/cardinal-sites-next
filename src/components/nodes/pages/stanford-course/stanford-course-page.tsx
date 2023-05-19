import {redirect} from "next/navigation";
import {CourseNodeType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";

const StanfordCoursePage = ({node}: { node: CourseNodeType }) => {
  if (node.su_course_link?.url) redirect(node.su_course_link.url);
  return (
    <div className="cc my-32">
      <h1>{node.title}</h1>
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
            {node.su_course_tags.map((tag, i) =>
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
    </div>
  )
}
export default StanfordCoursePage;