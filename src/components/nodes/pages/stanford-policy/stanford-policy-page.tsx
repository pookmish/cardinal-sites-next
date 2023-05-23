import {PolicyNodeType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import StanfordPolicyCard from "@/components/nodes/cards/stanford-policy/stanford-policy-card";
import {getResources} from "@/lib/drupal/get-resource";

const StanfordPolicyPage = async ({node}: { node: PolicyNodeType }) => {
  const relatedPolicies: PolicyNodeType[] = await getResources(node.su_policy_related ?? [])

  return (
    <div className="centered pt-32">
      <h1>{node.title}</h1>
      <div className="flex flex-col gap-5">
      {node.su_policy_effective &&
        <div>
          <strong>Effective Date: </strong>
          {new Date(node.su_policy_effective).toLocaleDateString('en-us', {month: "long", day: "numeric", year: "numeric"})}
        </div>
      }

      {node.su_policy_authority &&
        <div>
          <strong>Authority: </strong>
          {node.su_policy_authority}
        </div>
      }
      {node.su_policy_updated &&
        <div>
          <strong>Last Updated: </strong>
          {new Date(node.su_policy_updated).toLocaleDateString('en-us', {month: "long", day: "numeric", year: "numeric"})}
        </div>
      }

      {node.body?.processed &&
        <Wysiwyg html={node.body.processed}/>
      }

      {relatedPolicies &&
        <div>
          <h2 className="text-centered">Related Policies</h2>
          <div className="flex flex-col lg:flex-row flex-wrap">
            {relatedPolicies.map((policy: PolicyNodeType) =>
              <StanfordPolicyCard node={policy} key={policy.id}/>
            )}
          </div>
        </div>
      }
      </div>
    </div>
  )
}
export default StanfordPolicyPage;