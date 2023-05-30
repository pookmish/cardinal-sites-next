import SiteSearchForm from "@/components/search/site-search-form";
import MainMenu from "@/components/menu/main-menu";
import {getMenu} from "@/lib/drupal/get-menu";
import GlobalMessage from "@/components/config-pages/global-message/global-message";
import Lockup from "@/components/elements/lockup/lockup";

const PageHeader = async () => {
  const {tree} = await getMenu('main')

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

      {/* @ts-expect-error Async Server Component */}
      <GlobalMessage/>

      <div className="relative shadow">
        <div className="centered min-h-50">
          <div className="flex w-full justify-between">
            {/* @ts-expect-error Async Server Component */}
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