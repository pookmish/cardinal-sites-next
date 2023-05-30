import SharedTagsCardView from "@/components/views/shared-tags/shared-tags-card-view";
import PageListView from "@/components/views/stanford-page/page-list-view";
import NewsCardView from "@/components/views/stanford-news/news-card-view";
import NewsListView from "@/components/views/stanford-news/news-list-view";
import PersonCardView from "@/components/views/stanford-person/person-card-view";
import EventsCardView from "@/components/views/stanford-events/events-card-view";
import EventsListView from "@/components/views/stanford-events/events-list-view";
import PageCardView from "@/components/views/stanford-page/page-card-view";
import CourseListView from "@/components/views/stanford-courses/course-list-view";
import CourseCardView from "@/components/views/stanford-courses/course-card-view";
import PublicationsApaView from "@/components/views/stanford-publications/publications-apa-view";
import PublicationsChicagoView from "@/components/views/stanford-publications/publications-chicago-view";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {DrupalNode} from "next-drupal";
import {getView} from "@/lib/drupal/get-view";
import {getResources} from "@/lib/drupal/get-resource";
import {JSX} from "react";

interface Props {
  viewId: string;
  displayId: string;
  args?: string;
  itemsToDisplay?: number;
  emptyMessage?: string;
}

const View = async ({viewId, displayId, args, itemsToDisplay, emptyMessage}: Props): Promise<JSX.Element | undefined> => {
  const component = `${viewId}--${displayId}`;

  switch (component) {
    case 'stanford_basic_pages--basic_page_type_list':
      /* @ts-expect-error Async Server Component */
      return <PageListView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_news--vertical_cards':
      /* @ts-expect-error Async Server Component */
      return <NewsCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_news--block_1':
      /* @ts-expect-error Async Server Component */
      return <NewsListView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_person--grid_list_all':
      /* @ts-expect-error Async Server Component */
      return <PersonCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_events--cards':
      /* @ts-expect-error Async Server Component */
      return <EventsCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_events--past_events_list_block':
    case 'stanford_events--list_page':
      /* @ts-expect-error Async Server Component */
      return <EventsListView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_basic_pages--viewfield_block_1':
      /* @ts-expect-error Async Server Component */
      return <PageCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_shared_tags--card_grid':
      /* @ts-expect-error Async Server Component */
      return <SharedTagsCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_courses--default_list_viewfield_block':
      /* @ts-expect-error Async Server Component */
      return <CourseListView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_courses--vertical_teaser_viewfield_block':
      /* @ts-expect-error Async Server Component */
      return <CourseCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_publications--apa_list':
      /* @ts-expect-error Async Server Component */
      return <PublicationsApaView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_publications--chicago_list':
      /* @ts-expect-error Async Server Component */
      return <PublicationsChicagoView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />
  }
}

export async function getViewItems<T>(view: string, itemsToDisplay?: number, args?: string[]): Promise<T[]> {
  const drupalParams = new DrupalJsonApiParams();

  if (args && args.length > 0) {
    drupalParams.addCustomParam({'views-argument': args});
  }

  if (itemsToDisplay) {
    drupalParams.addPageLimit(itemsToDisplay);
  }
  let items: DrupalNode[] = [];

  try {
    const viewData = await getView<DrupalNode[]>(view, {params: drupalParams.getQueryObject()});
    items = viewData.results ?? [];
  } catch (e:unknown) {
    console.log(`Unable to fetch view ${view}` + (e instanceof Error ? e.message : ''));
  }
  return getResources<T>(items);
}

export default View;