import SharedTagsCardView from "@components/views/shared-tags/shared-tags-card-view";
import PageListView from "@components/views/stanford-page/page-list-view";
import NewsCardView from "@components/views/stanford-news/news-card-view";
import NewsListView from "@components/views/stanford-news/news-list-view";
import PersonCardView from "@components/views/stanford-person/person-card-view";
import EventsCardView from "@components/views/stanford-events/events-card-view";
import EventsListView from "@components/views/stanford-events/events-list-view";
import PageCardView from "@components/views/stanford-page/page-card-view";
import CourseListView from "@components/views/stanford-courses/course-list-view";
import CourseCardView from "@components/views/stanford-courses/course-card-view";
import PublicationsApaView from "@components/views/stanford-publications/publications-apa-view";
import PublicationsChicagoView from "@components/views/stanford-publications/publications-chicago-view";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getView} from "@lib/drupal/get-view";
import {getResources} from "@lib/drupal/get-resource";
import {JSX} from "react";
import {StanfordNode} from "@lib/types";

interface Props {
  viewId: string;
  displayId: string;
  args?: string;
  itemsToDisplay?: number;
  emptyMessage?: string;
  headingLevel?: string
}

const View = async ({viewId, displayId, args, itemsToDisplay = -1, emptyMessage, headingLevel = 'h3'}: Props): Promise<JSX.Element | undefined> => {
  const component = `${viewId}--${displayId}`;

  const viewProps = {
    view: component,
    args,
    itemsToDisplay,
    emptyMessage,
    headingLevel,
  }

  switch (component) {
    case 'stanford_basic_pages--basic_page_type_list':
      return <PageListView {...viewProps}/>

    case 'stanford_news--vertical_cards':
      return <NewsCardView {...viewProps} />

    case 'stanford_news--block_1':
      return <NewsListView {...viewProps}/>

    case 'stanford_person--grid_list_all':
      return <PersonCardView {...viewProps}/>

    case 'stanford_events--cards':
      return <EventsCardView {...viewProps}/>

    case 'stanford_events--past_events_list_block':
    case 'stanford_events--list_page':
      return <EventsListView {...viewProps}/>

    case 'stanford_basic_pages--viewfield_block_1':
      return <PageCardView {...viewProps}/>

    case 'stanford_shared_tags--card_grid':
      return <SharedTagsCardView {...viewProps}/>

    case 'stanford_courses--default_list_viewfield_block':
      return <CourseListView {...viewProps}/>

    case 'stanford_courses--vertical_teaser_viewfield_block':
      return <CourseCardView {...viewProps}/>

    case 'stanford_publications--apa_list':
      return <PublicationsApaView {...viewProps}/>

    case 'stanford_publications--chicago_list':
      return <PublicationsChicagoView {...viewProps}/>
  }
}

export const getViewItems = async <T, >(view: string, itemsToDisplay: number = -1, args: string[] = []): Promise<T[]> => {
  const drupalParams = new DrupalJsonApiParams();

  if (args && args.length > 0) {
    drupalParams.addCustomParam({'views-argument': args});
  }

  if (itemsToDisplay > 0) {
    // Find new way to add the item limit since this throws errors.
    drupalParams.addPageLimit(itemsToDisplay);
  }
  let items: StanfordNode[] = [];

  try {
    const viewData = await getView<StanfordNode[]>(view, {params: drupalParams.getQueryObject()});
    items = viewData.results ?? [];
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Unable to fetch view ${view}: ${e.message}`)
    }
  }
  return getResources<T>(items);
}

export default View;