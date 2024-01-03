import Rows from "@components/paragraphs/rows/rows";
import InteriorPage from "@components/layouts/interior-page";
import Paragraph from "@components/paragraphs/paragraph";
import {H1} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {BasicPageNodeType} from "@lib/types";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: BasicPageNodeType
  headingLevel?: string
}

const StanfordPagePage = ({node, ...props}: Props) => {
  const fullWidth = node.layout_selection?.resourceIdObjMeta.drupal_internal__target_id === 'stanford_basic_page_full';

  return (
    <article {...props}>
      {node.su_page_banner &&
        <header aria-label="Page banner">
          <Paragraph paragraph={node.su_page_banner}/>
        </header>
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
        <Rows components={node.su_page_components}/>
      }

    </article>
  );
};
export default StanfordPagePage;