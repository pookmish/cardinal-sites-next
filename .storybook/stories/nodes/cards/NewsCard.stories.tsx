import type {Meta, StoryObj} from '@storybook/react';

import StanfordNewsCard from "@components/nodes/cards/stanford-news/stanford-news-card";
import {StanfordNewsData} from "../StanfordNews.data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordNewsCard> = {
  title: 'Design/Nodes/Cards/News Card',
  component: StanfordNewsCard,
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
type Story = StoryObj<typeof StanfordNewsCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NewsCard: Story = {
  args: {
    headingLevel: "h2",
    node: StanfordNewsData()
  },
};
