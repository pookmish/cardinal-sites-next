import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";
import View from "@components/views/view";
import {H2} from "@components/elements/headers";
import {cache, HtmlHTMLAttributes, Suspense} from "react";
import {Maybe, NodeUnion, ParagraphStanfordList} from "@lib/gql/__generated__/drupal";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";
import {graphqlClient} from "@lib/gql/fetcher";
import {buildHeaders} from "@lib/drupal/utils";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordList
}

const ListParagraph = async ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph);
  const viewId = paragraph.suListView?.view || '';
  const displayId = paragraph.suListView?.display || '';

  let viewItems = await getViewItems(viewId, displayId, paragraph.suListView?.contextualFilter);
  // let viewItems = (viewId && displayId) ? await getViewResults<StanfordNode>(viewId, displayId, paragraph.suListView?.contextualFilter) : [];
  if (paragraph.suListView?.pageSize) {
    viewItems = viewItems.slice(0, paragraph.suListView.pageSize)
  }

  if (behaviors.list_paragraph?.hide_empty && viewItems.length === 0) return null;

  return (
    <div className="centered lg:max-w-[980px] flex flex-col gap-10 mb-20" {...props}>
      {paragraph.suListHeadline &&
        <H2>{paragraph.suListHeadline}</H2>
      }
      {paragraph.suListDescription?.processed &&
        <Wysiwyg html={paragraph.suListDescription?.processed}/>
      }

      {(viewItems.length > 0) &&
        <Suspense fallback={null}>
          <View
            viewId={viewId}
            displayId={displayId}
            items={viewItems}
            headingLevel={paragraph.suListHeadline ? 'h3' : 'h2'}
          />
        </Suspense>
      }

      {(viewItems.length === 0 && behaviors.list_paragraph?.empty_message) &&
        <p>{behaviors.list_paragraph.empty_message}</p>
      }

      {paragraph.suListButton?.url &&
        <div>
          <Button centered href={paragraph.suListButton.url}>
            {paragraph.suListButton.title}
          </Button>
        </div>
      }
    </div>
  )
}

const getViewItems = cache(async (viewId: string, displayId: string, contextualFilter?: Maybe<string[]>): Promise<NodeUnion[]> => {
  let items: NodeUnion[] = []

  const tags = ['views'];
  switch (`${viewId}--${displayId}`) {
    case 'stanford_shared_tags--card_grid':
      tags.push('views:all');
      break;

    case 'stanford_basic_pages--basic_page_type_list':
    case 'stanford_basic_pages--viewfield_block_1':
      tags.push('views:stanford_page');
      break

    case 'stanford_courses--default_list_viewfield_block':
    case 'stanford_courses--vertical_teaser_viewfield_block':
      tags.push('views:stanford_course');
      break

    case 'stanford_events--cards':
    case 'stanford_events--list_page':
    case 'stanford_events--past_events_list_block':
      tags.push('views:stanford_event');
      break

    case 'stanford_news--block_1':
    case 'stanford_news--vertical_cards':
      tags.push('views:stanford_news');
      break

    case 'stanford_person--grid_list_all':
      tags.push('views:stanford_person');
      break

    case 'stanford_publications--apa_list':
    case 'stanford_publications--chicago_list':
      tags.push('views:stanford_publication');
      break
  }

  const headers = await buildHeaders();
  const client = graphqlClient({headers, next: {tags}});
  let filters = getViewFilters(['term_node_taxonomy_name_depth'], contextualFilter)
  let graphqlResponse;

  switch (`${viewId}--${displayId}`) {
    case 'stanford_basic_pages--basic_page_type_list':
      filters = getViewFilters(['term_node_taxonomy_name_depth', 'type'], contextualFilter)
      if (filters && Object.keys(filters).length === 2) filters.nid = '0'
      graphqlResponse = await client.stanfordBasicPages({filters});
      items = graphqlResponse.stanfordBasicPages?.results as unknown as NodeUnion[]
      break

    case 'stanford_basic_pages--viewfield_block_1':
      graphqlResponse = await client.stanfordBasicPagesCards({filters});
      items = graphqlResponse.stanfordBasicPagesCards?.results as unknown as NodeUnion[]
      break

    case 'stanford_courses--default_list_viewfield_block':
      graphqlResponse = await client.stanfordCourses({filters});
      items = graphqlResponse.stanfordCourses?.results as unknown as NodeUnion[]
      break

    case 'stanford_courses--vertical_teaser_viewfield_block':
      graphqlResponse = await client.stanfordCoursesCardGrid({filters});
      items = graphqlResponse.stanfordCoursesCardGrid?.results as unknown as NodeUnion[]
      break

    case 'stanford_events--cards':
      filters = getViewFilters(['term_node_taxonomy_name_depth', 'term_node_taxonomy_name_depth_1', 'term_node_taxonomy_name_depth_2', 'term_node_taxonomy_name_depth_3'], contextualFilter)
      graphqlResponse = await client.stanfordEventsCardGrid({filters});
      items = graphqlResponse.stanfordEventsCardGrid?.results as unknown as NodeUnion[]
      break

    case 'stanford_events--list_page':
      filters = getViewFilters(['term_node_taxonomy_name_depth', 'term_node_taxonomy_name_depth_1', 'term_node_taxonomy_name_depth_2', 'term_node_taxonomy_name_depth_3'], contextualFilter);
      graphqlResponse = await client.stanfordEvents({filters});
      items = graphqlResponse.stanfordEvents?.results as unknown as NodeUnion[]
      break

    case 'stanford_events--past_events_list_block':
      graphqlResponse = await client.stanfordEventsPastEvents({filters});
      items = graphqlResponse.stanfordEventsPastEvents?.results as unknown as NodeUnion[]
      break

    case 'stanford_news--block_1':
      graphqlResponse = await client.stanfordNewsDefaultList({filters});
      items = graphqlResponse.stanfordNewsDefaultList?.results as unknown as NodeUnion[]
      break

    case 'stanford_news--vertical_cards':
      graphqlResponse = await client.stanfordNewsCardGrid({filters});
      items = graphqlResponse.stanfordNewsCardGrid?.results as unknown as NodeUnion[]
      break

    case 'stanford_person--grid_list_all':
      graphqlResponse = await client.stanfordPerson({filters});
      items = graphqlResponse.stanfordPerson?.results as unknown as NodeUnion[]
      break

    case 'stanford_publications--apa_list':
      graphqlResponse = await client.stanfordPublicationsApa({filters});
      items = graphqlResponse.stanfordPublicationsApa?.results as unknown as NodeUnion[]
      break

    case 'stanford_publications--chicago_list':
      graphqlResponse = await client.stanfordPublicationsChicago({filters});
      items = graphqlResponse.stanfordPublicationsChicago?.results as unknown as NodeUnion[]
      break

    case 'stanford_shared_tags--card_grid':
      filters = getViewFilters(['term_node_taxonomy_name_depth', 'type'], contextualFilter)
      graphqlResponse = await client.stanfordSharedTags({filters});
      items = graphqlResponse.stanfordSharedTags?.results as unknown as NodeUnion[]
      break

    default:
      console.error(`Unable to find query for view: ${viewId} display: ${displayId}`)
      break;
  }
  return items;
})

const getViewFilters = (keys: string[], values?: Maybe<string[]>) => {
  if (!keys || !values) return;
  const filters: Record<string, string | undefined> = keys.reduce((obj, key, index) => ({
    ...obj,
    [key]: values[index]
  }), {})
  Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
  return filters;
}

export default ListParagraph;