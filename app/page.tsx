import Rows from "@components/paragraphs/rows/rows";
import {notFound} from "next/navigation";
import {getEntityFromPath} from "@lib/gql/fetcher";
import {NodeStanfordPage, NodeUnion} from "@lib/gql/__generated__/drupal";
import {isDraftMode} from "@lib/drupal/utils";
import {Metadata} from "next";
import {getNodeMetadata} from "./[...slug]/metadata";
import BannerParagraph from "@components/paragraphs/stanford-banner/banner-paragraph";

// Cache the home page for 24 hours. It's the most likely to have view paragraphs, so let it invalidate more often.
export const revalidate = 86400;

const Home = async () => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>('/', isDraftMode());
  if (!entity) notFound();

  return (
    <article>
      {entity.suPageBanner?.__typename === 'ParagraphStanfordBanner' &&
        <header aria-label="Home Page banner">
          <BannerParagraph paragraph={entity.suPageBanner} eagerLoadImage/>
        </header>
      }
      {entity.suPageComponents &&
        <Rows components={entity.suPageComponents}/>
      }
    </article>
  )
}

export const generateMetadata = async (): Promise<Metadata> => {
  const {entity} = await getEntityFromPath<NodeUnion>('/')
  return entity ? getNodeMetadata(entity) : {};
}

export default Home;