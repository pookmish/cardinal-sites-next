import SiteSearchForm from "@components/search/site-search-form";
import MainMenu from "@components/menu/main-menu";
import GlobalMessage from "@components/config-pages/global-message";
import Lockup from "@components/elements/lockup/lockup";
import {getConfigPage, getMenu} from "@lib/gql/fetcher";
import {StanfordGlobalMessage} from "@lib/gql/__generated__/drupal";

const PageHeader = async () => {
  const menuItems = await getMenu();
  const globalMessageConfig = await getConfigPage<StanfordGlobalMessage>('StanfordGlobalMessage');

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
      <GlobalMessage configPage={globalMessageConfig}/>
      <div className="relative shadow">
        <div className="centered min-h-50">
          <div className="flex w-full justify-between">
            <Lockup/>
            <SiteSearchForm className="hidden lg:block"/>
          </div>
        </div>

        <MainMenu menuItems={menuItems}/>
      </div>
    </header>
  )
}
export default PageHeader;