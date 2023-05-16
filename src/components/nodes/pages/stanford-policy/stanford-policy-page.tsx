import {PolicyNodeType} from "@/lib/types";

const StanfordPolicyPage = ({node}: { node: PolicyNodeType }) => {
  return (
    <h1>{node.title}</h1>
  )
}
export default StanfordPolicyPage;