import {getMenu} from "@lib/drupal/get-menu";
import SideNav from "@components/menu/side-nav";
import {HtmlHTMLAttributes} from "react";
import {isDraftMode} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  currentPath: string
}

const InteriorPage = async ({children, currentPath, ...props}: Props) => {
  const draftMode = isDraftMode();
  const {tree} = await getMenu('main', {draftMode});

  return (
    <div className="centered flex gap-20" {...props}>
      <section className="flex-grow">
        {children}
      </section>
      <SideNav menuItems={tree} currentPath={currentPath}/>
    </div>
  )
}
export default InteriorPage;