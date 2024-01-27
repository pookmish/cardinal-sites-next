import {getMenu} from "@lib/gql/fetcher";
import SideNav from "@components/menu/side-nav";
import {HtmlHTMLAttributes} from "react";
type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  currentPath: string
}

const InteriorPage = async ({children, currentPath, ...props}: Props) => {
  const menu = await getMenu()

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