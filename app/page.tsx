import {getResourceByPath} from "@lib/drupal/get-resource";
import Rows from "@components/paragraphs/rows/rows";
import {BasicPageNodeType} from "@lib/types";
import Paragraph from "@components/paragraphs/paragraph";
import {isDraftMode} from "@lib/drupal/utils";

export const revalidate = 86400;

const Home = async () => {
  const draftDev = isDraftMode()
  const node = await getResourceByPath<BasicPageNodeType>('/', {}, draftDev);

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