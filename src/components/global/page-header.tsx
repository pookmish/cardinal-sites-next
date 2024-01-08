import SiteSearchForm from "@components/search/site-search-form";
import MainMenu from "@components/menu/main-menu";
import {getMenu} from "@lib/drupal/get-menu";
import GlobalMessage from "@components/config-pages/global-message";
import Lockup from "@components/elements/lockup/lockup";
import {isDraftMode} from "@lib/drupal/utils";
import {getConfigPageResource} from "@lib/drupal/get-resource";
import {GlobalMessageConfigPageType} from "@lib/drupal/drupal-jsonapi.types";

const PageHeader = async () => {
  const draftMode = isDraftMode();
  const {tree} = await getMenu('main', {draftMode})

  // Fetch from JSON API, it should return a cached version.
  const globalMessage = await getConfigPageResource<GlobalMessageConfigPageType>('stanford_global_message');

  return (
    <header className="shadow-lg">
      <div className="bg-cardinal-red">
        <div className="centered py-3">
          <a
            className="font-stanford no-underline hocus:underline text-white hocus:text-white leading-none"
            href="https://www.stanford.edu"
          >
            Stanford University
          </a>
        </div>
      </div>
      <GlobalMessage configPage={globalMessage}/>
      <div className="relative shadow">
        <div className="centered min-h-50">
          <div className="flex w-full justify-between">
            <Lockup/>
            <SiteSearchForm className="hidden lg:block"/>
          </div>
        </div>

        <MainMenu menuItems={tree}/>
      </div>
    </header>
  )
}
export default PageHeader;