import {getMenu} from "@/lib/drupal/get-menu";
import SideNav from "@/components/menu/side-nav";

const InteriorPage = async ({children}) => {
  const {tree} = await getMenu('main');

  return (
    <div className="max-w-1500 mx-auto px-10 3xl:px-0 flex gap-20">
      <SideNav menuItems={tree}/>
      <article className="flex-grow">
        {children}
      </article>
    </div>
  )
}
export default InteriorPage;