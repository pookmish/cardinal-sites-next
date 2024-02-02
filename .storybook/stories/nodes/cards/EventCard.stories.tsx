import type {Meta, StoryObj} from '@storybook/react';

import StanfordEventCard from "@components/nodes/cards/stanford-event/stanford-event-card";
import {StanfordEventData} from "../StanfordEvent.data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordEventCard> = {
  title: 'Design/Nodes/Cards/Event Card',
  component: StanfordEventCard,
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
type Story = StoryObj<typeof StanfordEventCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EventCard: Story = {
  args: {
    headingLevel: "h2",
    node: StanfordEventData()
  },
};
