import SiteSearchForm from "@components/search/site-search-form";
import MainMenu from "@components/menu/main-menu";
import {getMenu} from "@lib/drupal/get-menu";
import GlobalMessage from "@components/config-pages/global-message/global-message";
import Lockup from "@components/elements/lockup/lockup";
import {getConfigPageResource} from "@lib/drupal/get-resource";
import {GlobalMessageConfigPageType, LockupSettingsConfigPageType, SiteSettingsConfigPageType} from "@lib/types";
import {isDraftMode} from "@lib/drupal/utils";

const PageHeader = async () => {
  const draftDev = isDraftMode();
  const {tree} = await getMenu('main', {}, draftDev)
  const globalMessage  = await getConfigPageResource<GlobalMessageConfigPageType>('stanford_global_message');
  const siteSettings = await getConfigPageResource<SiteSettingsConfigPageType>('stanford_basic_site_settings')
  const lockupSettings = await getConfigPageResource<LockupSettingsConfigPageType>('lockup_settings')

  return (
    <header className="shadow-lg">
      <div className="bg-cardinal-red">
        <div className="centered py-3">
          <a
            className="font-stanford no-underline hocus:underline text-white hocus:text-white leading-none"
            href="https://www.stanford.edu">
            Stanford University
          </a>
        </div>
      </div>

      {globalMessage &&
        <GlobalMessage
          type={globalMessage.su_global_msg_type}
          message={globalMessage.su_global_msg_message}
          label={globalMessage.su_global_msg_label}
          link={globalMessage.su_global_msg_link}
          header={globalMessage.su_global_msg_header}
          enabled={globalMessage.su_global_msg_enabled}
        />
      }

      <div className="relative shadow">
        <div className="centered min-h-50">
          <div className="flex w-full justify-between">
            <Lockup siteSettings={siteSettings} lockupSettings={lockupSettings}/>
            <SiteSearchForm className="hidden lg:block"/>
          </div>
        </div>

        <MainMenu menuItems={tree}/>
      </div>
    </header>
  )
}
export default PageHeader;