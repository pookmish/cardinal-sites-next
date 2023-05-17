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

const View = async ({viewId, displayId, args, itemsToDisplay, emptyMessage}) => {
  const component = `${viewId}--${displayId}`;

  switch (component) {
    case 'stanford_basic_pages--basic_page_type_list':
      return <PageListView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_news--vertical_cards':
      return <NewsCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_news--block_1':
      return <NewsListView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_person--grid_list_all':
      return <PersonCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_events--cards':
      return <EventsCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_events--past_events_list_block':
    case 'stanford_events--list_page':
      return <EventsListView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_basic_pages--viewfield_block_1':
      return <PageCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_shared_tags--card_grid':
      return <SharedTagsCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_courses--default_list_viewfield_block':
      return <CourseListView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_courses--vertical_teaser_viewfield_block':
      return <CourseCardView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_publications--apa_list':
      return <PublicationsApaView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />

    case 'stanford_publications--chicago_list':
      return <PublicationsChicagoView
        view={component}
        args={args}
        itemsToDisplay={itemsToDisplay}
        emptyMessage={emptyMessage}
      />
  }

  return (
    <div>
      Need to build this view: <em>{component}</em>
    </div>
  )
}

export const getViewItems = async <T>({view, args = [], itemsToDisplay}: { view: string, args?: string[], itemsToDisplay?: number }): Promise<T[]> => {
  const drupalParams = new DrupalJsonApiParams();

  if (args.length > 0) {
    drupalParams.addCustomParam({'views-argument': args});
  }

  if (itemsToDisplay) {
    drupalParams.addPageLimit(itemsToDisplay);
  }
  let items: DrupalNode[] = [];

  try {
    const viewData = await getView<DrupalNode[]>(view, {params: drupalParams.getQueryObject()});
    items = viewData.results ?? [];
  } catch (e) {
    console.log(`Unable to fetch view ${view}: ${e.message}`)
  }
  return await getResources<T>(items);
}

export default View;