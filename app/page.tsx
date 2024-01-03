import Rows from "@components/paragraphs/rows/rows";
import Paragraph from "@components/paragraphs/paragraph";
import {notFound} from "next/navigation";
import {getEntityFromPath} from "@lib/gql/fetcher";
import {NodeStanfordPage} from "@lib/gql/__generated__/drupal";
import {isDraftMode} from "@lib/drupal/utils";

// Cache the home page for 24 hours. It should be the most modified and probably changes most frequent.
export const revalidate = 86400;

const Home = async () => {
  const routeInfo = await getEntityFromPath<NodeStanfordPage>('/', isDraftMode());
  if (!routeInfo?.entity) notFound();

  return (
    <article>
      {routeInfo.entity.suPageBanner &&
        <header aria-label="Home Page banner">
          <Paragraph paragraph={routeInfo.entity.suPageBanner}/>
        </header>
      }
      {routeInfo.entity.suPageComponents &&
        <Rows components={routeInfo.entity.suPageComponents}/>
      }
    </article>
  )
}

export default Home;