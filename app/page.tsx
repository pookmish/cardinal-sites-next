import {getResourceByPath} from "@/lib/drupal/get-resource";
import Rows from "@/components/paragraphs/rows/rows";
import {BasicPageNodeType} from "@/lib/types";
import Paragraph from "@/components/paragraphs/paragraph";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

export const revalidate = 300;

const Home = async () => {
  const params = new DrupalJsonApiParams();
  params.addInclude(['node_type']);
  const node = await getResourceByPath<BasicPageNodeType>('/', {params: params.getQueryObject()});

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