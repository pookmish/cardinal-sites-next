import {PolicyChangeLogType, PolicyNodeType} from "@/lib/types";
import Wysiwyg from "@/components/elements/wysiwyg";
import StanfordPolicyCard from "@/components/nodes/cards/stanford-policy/stanford-policy-card";
import {getResources} from "@/lib/drupal/get-resource";
import StringWithLines from "@/components/elements/string-with-lines";
import {JSX} from "react";
import {H1, H2, H3} from "@/components/elements/headers";

const StanfordPolicyPage = async ({node}: { node: PolicyNodeType }): Promise<JSX.Element> => {
  const relatedPolicies: PolicyNodeType[] = await getResources(node.su_policy_related ?? [])
  const changeLog = node.su_policy_changelog?.filter((change: PolicyChangeLogType) => change.su_policy_public) ?? []

  return (
    <div className="centered pt-32">
      <H1>
        {node.title}
      </H1>
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

        {changeLog &&

          <div className="bg-black-10 p-20 border border-black-40 mb-10">
            <H2 className="text-m1">Change log:</H2>

            {changeLog.map((change: PolicyChangeLogType) =>
              <div key={change.id}>
                <H3 className="flex gap-2 text-m0">
                  <div>{new Date(change.su_policy_date).toLocaleDateString('en-us', {month: "long", day: "numeric", year: "numeric"})}</div>
                  <div className="w-[2px] bg-black shrink-0"/>
                  <div>{change.su_policy_title}</div>
                </H3>

                <div>
                  <StringWithLines text={change.su_policy_notes}/>
                </div>
              </div>
            )}
          </div>
        }


        {node.body?.processed &&
          <Wysiwyg html={node.body.processed}/>
        }


        {(relatedPolicies.length > 0) &&
          <div>
            <H2 className="text-centered">Related Policies</H2>
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