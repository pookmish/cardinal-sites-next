import {BasicPageNodeType} from "@lib/types";
import Rows from "@components/paragraphs/rows/rows";
import InteriorPage from "@components/layouts/interior-page";
import Paragraph from "@components/paragraphs/paragraph";
import {H1} from "@components/elements/headers";

const StanfordPagePage = ({node}: { node: BasicPageNodeType }) => {
  console.log(node);
  const fullWidth = node.layout_selection?.resourceIdObjMeta.drupal_internal__target_id === 'stanford_basic_page_full';
  return (
    <div>
      {node.su_page_banner &&
        <Paragraph paragraph={node.su_page_banner}/>
      }
      <H1 className="mt-32 centered">
        {node.title}
      </H1>

      {!fullWidth &&
        <InteriorPage currentPath={node.path.alias}>
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