import {BasicPageNodeType} from "@/lib/types";
import Rows from "@/components/paragraphs/rows/rows";
import InteriorPage from "@/components/layouts/interior-page";
import Paragraph from "@/components/paragraphs/paragraph";

const StanfordPagePage = ({node}: { node: BasicPageNodeType }) => {
  const fullWidth = node.layout_selection?.resourceIdObjMeta.drupal_internal__target_id === 'stanford_basic_page_full';
  return (
    <div>
      {node.su_page_banner &&
        <Paragraph paragraph={node.su_page_banner}/>
      }
      <h1 className="mt-32 max-w-1500 w-full mx-auto px-10 3xl:px-0">{node.title}</h1>

      {!fullWidth &&
        <InteriorPage>
          {node.su_page_components &&
            <Rows components={node.su_page_components}/>
          }
        </InteriorPage>
      }

      {(fullWidth && node.su_page_components) &&
        <>
          {node.su_page_components &&
            <Rows components={node.su_page_components}/>
          }
        </>
      }

    </div>
  );
};
export default StanfordPagePage;