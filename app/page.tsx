import {getResourceByPath} from "@/lib/drupal/get-resource";
import Rows from "@/components/paragraphs/rows/rows";
import {BasicPageNodeType} from "@/lib/types";
import Paragraph from "@/components/paragraphs/paragraph";

export const revalidate = 300;

const Home = async () => {

  const node = await getResourceByPath<BasicPageNodeType>('/');

  return (
    <>
      {node.su_page_banner &&
        <Paragraph paragraph={node.su_page_banner}/>
      }
      {node.su_page_components &&
        <Rows components={node.su_page_components}/>
      }
    </>
  )
}

export default Home;