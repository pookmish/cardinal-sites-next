import type {Meta, StoryObj} from '@storybook/react';

import StanfordEventSeriesCard from "@components/nodes/cards/stanford-event-series/stanford-event-series-card";
import {ImageMedia} from "../../media";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordEventSeriesCard> = {
  title: 'Design/Nodes/Cards/Event Series Card',
  component: StanfordEventSeriesCard,
  tags: ['autodocs'],
  argTypes: {
    headingLevel: {
      options: ["h2", "h3"],
      control: {type: "select"}
    },
    node: {
      table: {
        disable: true,
      }
    },
  }
};

export default meta;
type Story = StoryObj<typeof StanfordEventSeriesCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EventSeriesCard: Story = {
  render: ({headingLevel, ...args}) => {
    return <StanfordEventSeriesCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    suEventSeriesDek: "su_event_series_dek",
    suEventSeriesEvent: [],
    suEventSeriesSubheadline: "su_event_series_subheadline",
    suEventSeriesType: [{id: 1, name: "su_event_series_type1"}, {id: 2, name: "su_event_series_type2"}],
    suSharedTags: [{id: 1, name: "su_shared_tags1"}, {id: 1, name: "su_shared_tags2"}]
  },
};
