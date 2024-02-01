import {getMenu} from "@lib/gql/fetcher";
import SideNav from "@components/menu/side-nav";
import {HtmlHTMLAttributes} from "react";
import {isDraftMode} from "@lib/drupal/utils";
import {MenuAvailable} from "@lib/gql/__generated__/drupal";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  currentPath: string
}

const InteriorPage = async ({children, currentPath, ...props}: Props) => {
  const menu = await getMenu(MenuAvailable.Main, isDraftMode());

  return (
    <div className="centered flex gap-20" {...props}>
      <section className="flex-grow">
        {children}
      </section>
      <SideNav menuItems={menu} currentPath={currentPath}/>
    </div>
  )
}
export default InteriorPage;