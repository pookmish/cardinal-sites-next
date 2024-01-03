import Rows from "@components/paragraphs/rows/rows";
import Paragraph from "@components/paragraphs/paragraph";
import {notFound} from "next/navigation";
import {isDraftMode} from "@lib/drupal/utils";
import {getResourceByPath} from "@lib/drupal/get-resource";
import {BasicPageNodeType} from "@lib/types";

// Cache the home page for 24 hours. It should be the most modified and probably changes most frequent.
export const revalidate = 86400;

const Home = async () => {
  const node = await getResourceByPath<BasicPageNodeType>('/', {draftMode: isDraftMode()});
  if (!node) notFound();
  return (
    <article>
      {node.su_page_banner &&
        <header aria-label="Home Page banner">
          <Paragraph paragraph={node.su_page_banner}/>
        </header>
      }
      {node.su_page_components &&
        <Rows components={node.su_page_components}/>
      }
    </article>
  )
}

export default Home;