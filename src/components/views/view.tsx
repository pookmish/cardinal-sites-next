import NewsListView from "@/components/views/stanford-news/NewsListView";
import PersonCardView from "@/components/views/stanford-person/PersonCardView";
import PageListView from "@/components/views/stanford-page/PageListView";
import {getResources} from "@/lib/drupal/get-resource";
import NewsCardView from "@/components/views/stanford-news/NewsCardView";
import EventsCardView from "@/components/views/stanford-events/EventsCardView";
import PageCardView from "@/components/views/stanford-page/PageCardView";
import EventsListView from "@/components/views/stanford-events/EventsListView";

const View = async ({viewId, displayId, items}) => {
  items = await getResources(items);
  const component = `${viewId}--${displayId}`;

  switch (component) {
    case 'stanford_basic_pages--basic_page_type_list':
      return <PageListView items={items}/>

    case 'stanford_news--vertical_cards':
      return <NewsCardView items={items}/>

    case 'stanford_news--block_1':
      return <NewsListView items={items}/>

    case 'stanford_person--grid_list_all':
      return <PersonCardView items={items}/>

    case 'stanford_events--cards':
      return <EventsCardView items={items}/>

    case 'stanford_events--list_page':
      return <EventsListView items={items}/>

    case 'stanford_basic_pages--viewfield_block_1':
      return <PageCardView items={items}/>
  }

  return (
    <div>
      Need to build this view: <em>{component}</em>
    </div>
  )
}
export default View;