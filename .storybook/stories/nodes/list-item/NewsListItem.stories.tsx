import type {Meta, StoryObj} from '@storybook/react';

import StanfordNewsListItem from "@components/nodes/list-item/stanford-news/stanford-news-list-item";
import {ImageMedia} from "../../media";
import {NewsCard} from "../cards/NewsCard.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordNewsListItem> = {
  title: 'Design/Nodes/List Item/News List Item',
  component: StanfordNewsListItem,
  tags: ['autodocs'],
  argTypes: {
    su_news_featured_media: {
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
type Story = StoryObj<typeof StanfordNewsListItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NewsListItem: Story = {
  args: {...NewsCard.args},
  render: ({headingLevel, path, ...args}) => {
    args.su_news_featured_media = args.su_news_featured_media === "image" ? ImageMedia() : undefined;
    args.path = {
      alias: path
    }
    return <StanfordNewsListItem node={args} headingLevel={headingLevel}/>
  },

};
