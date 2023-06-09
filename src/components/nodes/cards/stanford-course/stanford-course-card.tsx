import {CourseNodeType} from "@/lib/types";
import Link from "@/components/elements/link";
import {H3} from "@/components/elements/headers";

const StanfordCourseCard = ({node}: {node:CourseNodeType}) => {
  return (
    <div className="max-w-[500px] w-full mx-auto shadow-xl border border-black-20 p-10 overflow-hidden">
      <Link href={node.path?.alias} className="text-black no-underline hocus:text-black hocus:underline">
        <H3 className=" text-m2">{node.title}</H3>
      </Link>
    </div>
  )
}
export default StanfordCourseCard;