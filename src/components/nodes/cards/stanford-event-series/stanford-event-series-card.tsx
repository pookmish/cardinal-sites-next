import Link from "@/components/elements/link";
import {EventSeriesNodeType} from "@/lib/types";

const StanfordEventSeriesCard = ({node}:{node:EventSeriesNodeType}) => {
  return (
    <div className="max-w-[500px] mx-auto shadow-xl border border-black-20 p-10">
      <Link href={node.path} className="text-black no-underline hocus:text-black hocus:underline">
        <h3 className=" text-m2">{node.title}</h3>
      </Link>
    </div>
  )
}
export default StanfordEventSeriesCard;