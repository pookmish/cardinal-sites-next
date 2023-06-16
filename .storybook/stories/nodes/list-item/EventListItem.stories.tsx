import type {Meta, StoryObj} from '@storybook/react';

import StanfordEventListItem from "@components/nodes/list-item/stanford-event/stanford-event-list-item";
import {EventCard} from "../cards/EventCard.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordEventListItem> = {
  title: 'Design/Nodes/List Item/Event List Item',
  component: StanfordEventListItem,
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
type Story = StoryObj<typeof StanfordEventListItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EventListItem: Story = {
  args: {...EventCard.args},
  render: ({headingLevel, path, ...args}) => {
    args.path = {
      alias: path
    }
    return <StanfordEventListItem node={args} headingLevel={headingLevel}/>
  },
};
