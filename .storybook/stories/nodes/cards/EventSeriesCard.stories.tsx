import type {Meta, StoryObj} from '@storybook/react';

import StanfordEventSeriesCard from "@components/nodes/cards/stanford-event-series/stanford-event-series-card";
import {StanfordEventSeriesData} from "../StanfordEventSeries.data";

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
  args: {
    headingLevel: "h2",
    node: StanfordEventSeriesData()
  },
};
