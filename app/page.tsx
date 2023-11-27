import {getResourceByPath} from "@lib/drupal/get-resource";
import Rows from "@components/paragraphs/rows/rows";
import {BasicPageNodeType} from "@lib/types";
import Paragraph from "@components/paragraphs/paragraph";
import {isDraftMode} from "@lib/drupal/utils";
import {notFound} from "next/navigation";

export const revalidate = 86400;

const Home = async () => {
  const draftMode = isDraftMode()
  const node = await getResourceByPath<BasicPageNodeType>('/', {draftMode});
  if (!node) notFound();

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