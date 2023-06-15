import {getMenu} from "@lib/drupal/get-menu";
import SideNav from "@components/menu/side-nav";
import {PropsWithChildren} from "react";

const InteriorPage = async ({children}: PropsWithChildren<any>) => {
  const {tree} = await getMenu('main');

  return (
    <div className="max-w-1500 w-full mx-auto px-10 3xl:px-0 flex gap-20">
      <SideNav menuItems={tree}/>
      <article className="flex-grow">
        {children}
      </article>
    </div>
  )
}
export default InteriorPage;