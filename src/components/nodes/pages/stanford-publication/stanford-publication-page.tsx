import {PublicationNodeType} from "@lib/types";
import Rows from "@components/paragraphs/rows/rows";
import Citation from "@components/nodes/pages/stanford-publication/citation";
import Button from "@components/elements/button";
import {H1} from "@components/elements/headers";

const StanfordPublicationPage = ({node}: { node: PublicationNodeType }) => {
  return (
    <div className="centered pt-32">
      <div className="flex flex-col gap-10">
        <H1 className="order-2">
          {node.title}
        </H1>

        {node.su_publication_topics &&
          <div className="order-1">
            {node.su_publication_topics[0].name}
          </div>
        }
      </div>

      <div className="flex flex-col lg:flex-row gap-20">
        {node.su_publication_components &&
          <div className="order-2 lg:order-1 flex-grow">
            <Rows components={node.su_publication_components}/>
          </div>
        }

        <aside
          className="order-1 lg:order-2 lg:w-1/4 shrink-0 flex flex-col gap-10">
          {node.su_publication_citation &&
            <Citation citation={node.su_publication_citation}/>
          }

          {node.su_publication_cta &&
            <Button href={node.su_publication_cta.url}>
              {node.su_publication_cta.title}
            </Button>
          }
        </aside>
      </div>
    </div>
  )
}
export default StanfordPublicationPage;