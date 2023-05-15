import {getConfigPageResource} from "@/lib/drupal/get-resource";
import {LocalFooterConfigPageType} from "@/lib/types";
import Address from "@/components/elements/address";
import Link from "@/components/elements/link";
import Wysiwyg from "@/components/elements/wysiwyg";

const LocalFooter = async () => {
  const configPage = await getConfigPageResource<LocalFooterConfigPageType>('stanford_local_footer')
  if (!configPage || !configPage.su_footer_enabled) {
    return null;
  }
  return (
    <div className="local-footer bg-foggy-light py-20">
      <div className="cc">
        <div className="mb-20">
          <div>{configPage.su_local_foot_line_1}</div>
          <div>{configPage.su_local_foot_line_2}</div>
          <div>{configPage.su_local_foot_line_3}</div>
          <div>{configPage.su_local_foot_line_4}</div>
          <div>{configPage.su_local_foot_line_5}</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-32">
          <div>


            {configPage.su_local_foot_address &&
              <Address {...configPage.su_local_foot_address}/>
            }

            {configPage.su_local_foot_action &&
              <ul className="list-unstyled">
                {configPage.su_local_foot_action.map((link, index) =>
                  <li key={`footer-action-link-${index}`}>
                    <Link href={link.url}
                          className="no-underline hocus:underline hocus:text-black transition">
                      {link.title}
                    </Link>
                  </li>
                )}
              </ul>
            }

            {configPage.su_local_foot_pr_co &&
              <Wysiwyg html={configPage.su_local_foot_pr_co}/>
            }
          </div>

          <div>
            {configPage.su_local_foot_prime_h &&
              <h2 className="text-m1">{configPage.su_local_foot_prime_h}</h2>}
            {configPage.su_local_foot_primary &&
              <ul className="list-unstyled">
                {configPage.su_local_foot_primary.map((link, index) =>
                  <li key={`footer-primary-link-${index}`}>
                    <Link href={link.url}
                          className="no-underline hocus:underline hocus:text-black transition">
                      {link.title}
                    </Link>
                  </li>
                )}
              </ul>
            }
            {configPage.su_local_foot_se_co &&
              <Wysiwyg html={configPage.su_local_foot_se_co}/>
            }

          </div>

          <div>
            {configPage.su_local_foot_second_h &&
              <h2 className="text-m1">{configPage.su_local_foot_second_h}</h2>}

            {configPage.su_local_foot_second &&
              <ul className="list-unstyled">
                {configPage.su_local_foot_second.map((link, index) =>
                  <li key={`footer-second-link-${index}`}>
                    <Link href={link.url}
                          className="no-underline hocus:underline hocus:text-black transition">
                      {link.title}
                    </Link>
                  </li>
                )}
              </ul>
            }

            {configPage.su_local_foot_tr2_co &&
              <Wysiwyg html={configPage.su_local_foot_tr2_co}/>
            }

          </div>

          <div>
            {configPage.su_local_foot_tr_co &&
              <Wysiwyg html={configPage.su_local_foot_tr_co}/>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalFooter;