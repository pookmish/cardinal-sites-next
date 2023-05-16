import {EventSeriesNodeType} from "@/lib/types";

const StanfordEventSeriesPage = ({node}: { node: EventSeriesNodeType }) => {
  return (
    <h1>{node.title}</h1>
  )
}
export default StanfordEventSeriesPage;