import Rows from "@components/paragraphs/rows/rows";
import InteriorPage from "@components/layouts/interior-page";
import {H1} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeStanfordPage} from "@lib/gql/__generated__/drupal";
import BannerParagraph from "@components/paragraphs/stanford-banner/banner-paragraph";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPage
  headingLevel?: string
}

const StanfordPagePage = ({node, ...props}: Props) => {
  const fullWidth = node.layoutSelection?.id === 'stanford_basic_page_full';

  return (
    <article {...props}>
      {node.suPageBanner?.__typename === 'ParagraphStanfordBanner' &&
        <header aria-label="Page banner">
          <BannerParagraph paragraph={node.suPageBanner} eagerLoadImage/>
        </header>
      }
      <H1 className="mt-32 centered">
        {node.title}
      </H1>

      {!fullWidth &&
        <InteriorPage currentPath={node.path}>
          {node.suPageComponents &&
            <Rows components={node.suPageComponents}/>
          }
        </InteriorPage>
      }

      {(fullWidth && node.suPageComponents) &&
        <Rows components={node.suPageComponents}/>
      }

    </article>
  );
};
export default StanfordPagePage;