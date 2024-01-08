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
  const routeInfo = await getEntityFromPath<NodeStanfordPage>('/', isDraftMode());
  if (!routeInfo?.entity) notFound();

  return (
    <article>
      {routeInfo.entity.suPageBanner?.__typename === 'ParagraphStanfordBanner' &&
        <header aria-label="Home Page banner">
          <BannerParagraph paragraph={routeInfo.entity.suPageBanner} eagerLoadImage/>
        </header>
      }
      {routeInfo.entity.suPageComponents &&
        <Rows components={routeInfo.entity.suPageComponents}/>
      }
    </article>
  )
}

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const routeInfo = await getEntityFromPath<NodeUnion>('/')
    if (routeInfo?.entity) return getNodeMetadata(routeInfo.entity);
  } catch (e) {
  }
  return {}
}

export default Home;