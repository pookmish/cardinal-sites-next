import {PublicationNodeType} from "@/lib/types";

const StanfordPublicationPage = ({node}: { node: PublicationNodeType }) => {
  return (
    <h1>{node.title}</h1>
  )
}
export default StanfordPublicationPage;