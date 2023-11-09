import {SuperFooterConfigPageType} from "@lib/types";
import Wysiwyg from "@components/elements/wysiwyg";
import Link from "@components/elements/link";
import {LockClosedIcon} from "@heroicons/react/24/outline";
import {H2} from "@components/elements/headers";

const SuperFooter = ({configPage}: { configPage: SuperFooterConfigPageType }) => {
  if (!configPage.su_super_foot_enabled) {
    return null;
  }

  return (
    <div className="py-20 bg-foggy-light border-b border-black-20">
      <div className="centered flex justify-between">
        <div>
          {configPage.su_super_foot_title &&
            <H2 className="text-m2">{configPage.su_super_foot_title}</H2>
          }
          {configPage.su_super_foot_text &&
            <Wysiwyg html={configPage.su_super_foot_text}/>
          }
        </div>

        <div className="shrink-0">
          {configPage.su_super_foot_link &&
            <div className="mb-20">
              {configPage.su_super_foot_link.map((link, index) =>
                <Link key={`super-footer-link-${index}`} href={link.url} className="border border-black-20 block shadow-lg p-10 mb-5 bg-white text-digital-red no-underline hocus:bg-black hocus:text-white hocus:underline transition last:mb-0">
                  {link.title}
                </Link>
              )}
            </div>
          }

          {configPage.su_super_foot_intranet &&
            <Link href={configPage.su_super_foot_intranet.url} className="flex items-center text-digital-red no-underline hocus:text-black hocus:underline">
              {configPage.su_super_foot_intranet.title}
              <LockClosedIcon width={20} className="ml-2"/>
            </Link>
          }
        </div>
      </div>
    </div>
  )
}
export default SuperFooter;