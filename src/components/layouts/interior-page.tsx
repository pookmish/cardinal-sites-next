import {getMenu} from "@lib/drupal/get-menu";
import SideNav from "@components/menu/side-nav";
import {PropsWithChildren} from "react";
import {isDraftMode} from "@lib/drupal/utils";

const InteriorPage = async ({children}: PropsWithChildren<any>) => {
  const draftDev = isDraftMode();
  const {tree} = await getMenu('main', {}, draftDev);

  return (
    <div className="centered flex gap-20">
      <SideNav menuItems={tree}/>
      <article className="flex-grow">
        {children}
      </article>
    </div>
  )
}
export default InteriorPage;