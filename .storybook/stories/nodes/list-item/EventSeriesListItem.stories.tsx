import type {Meta, StoryObj} from '@storybook/react';

import StanfordEventSeriesListItem
  from "@components/nodes/list-item/stanford-event-series/stanford-event-series-list-item";
import {ImageMedia} from "../../media";
import {EventSeriesCard} from "../cards/EventSeriesCard.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordEventSeriesListItem> = {
  title: 'Design/Nodes/List Item/Event Series List Item',
  component: StanfordEventSeriesListItem,
  tags: ['autodocs'],
  argTypes: {
    su_page_image: {
      options: ["image", "none"],
      control: {type: "select"}
    },
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
type Story = StoryObj<typeof StanfordEventSeriesListItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EventSeriesListItem: Story = {
  args: {...EventSeriesCard.args},
  render: ({headingLevel, path, ...args}) => {
    args.su_page_image = args.su_page_image === "image" ? ImageMedia() : undefined;
    args.path = {
      alias: path
    }
    return <StanfordEventSeriesListItem node={args} headingLevel={headingLevel}/>
  },
};
