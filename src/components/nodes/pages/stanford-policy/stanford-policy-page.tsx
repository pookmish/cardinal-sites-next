import Wysiwyg from "@components/elements/wysiwyg";
import StanfordPolicyCard from "@components/nodes/cards/stanford-policy/stanford-policy-card";
import StringWithLines from "@components/elements/string-with-lines";
import {HtmlHTMLAttributes} from "react";
import {H1, H2, H3} from "@components/elements/headers";
import {PolicyNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: PolicyNodeType
  headingLevel?: string
}

const StanfordPolicyPage = async ({node, ...props}: Props) => {
  const changeLog = node.su_policy_changelog?.filter(change => change.su_policy_public) || []
  return (
    <article className="centered pt-32" {...props}>
      <H1>
        {node.title}
      </H1>
      <div className="flex flex-col gap-20">
        {(node.su_policy_authority || node.su_policy_updated || node.su_policy_effective) &&
          <div>
            {node.su_policy_authority &&
              <div>
                <strong>Authority: </strong>
                {node.su_policy_authority}
              </div>
            }
            {node.su_policy_updated &&
              <div>
                <strong>Last Updated: </strong>
                {new Date(node.su_policy_updated).toLocaleDateString('en-us', {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </div>
            }
            {node.su_policy_effective &&
              <div>
                <strong>Effective Date: </strong>
                {new Date(node.su_policy_effective).toLocaleDateString('en-us', {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </div>
            }
          </div>
        }

        {changeLog.length > 0 &&
          <div className="bg-black-10 p-20 border border-black-40 mb-10">
            <H2 className="text-m1">Change log:</H2>

            {changeLog.map(change =>
              <div key={change.id}>
                <H3 className="flex gap-2 text-m0">
                  <div>{new Date(change.su_policy_date).toLocaleDateString('en-us', {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}</div>
                  <div className="w-[2px] bg-black shrink-0"/>
                  <div>{change.su_policy_title}</div>
                </H3>

                <div>
                  <StringWithLines text={change.su_policy_notes} key={change.id}/>
                </div>
              </div>
            )}
          </div>
        }

        {node.body?.processed &&
          <Wysiwyg html={node.body.processed}/>
        }

        {node.su_policy_related &&
          <div>
            <H2 className="text-center">Related Policies</H2>
            <ul className="list-unstyled grid lg:grid-cols-3 gap-20">
              {node.su_policy_related.map(policy =>
                <li key={policy.id}>
                  <StanfordPolicyCard node={policy}/>
                </li>
              )}
            </ul>
          </div>
        }
      </div>
    </article>
  )
}
export default StanfordPolicyPage;