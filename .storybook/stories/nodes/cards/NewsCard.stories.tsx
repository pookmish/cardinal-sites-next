import type {Meta, StoryObj} from '@storybook/react';
import StanfordNewsCard from "@components/nodes/cards/stanford-news/stanford-news-card";
import {StanfordNewsData} from "../StanfordNews.data";
import {ComponentProps} from "react";
import {getStoryBookImage, getStoryBookTaxonomyTerm} from "../../storybook-entities";

type ComponentStoryProps = ComponentProps<typeof StanfordNewsCard> & {
  title: string
  suNewsFeaturedMedia?: string
  suNewsTopics?: string[]
  suNewsPublishingDate?: number
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
  title: 'Design/Nodes/Cards/News Card',
  component: StanfordNewsCard,
  tags: ['autodocs'],
  argTypes: {
    headingLevel: {
      options: ["h2", "h3"],
      control: {type: "select"}
    },
    suNewsPublishingDate: {
      control: "date"
    },
    suNewsFeaturedMedia: {
      options: ["image", "none"],
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
type Story = StoryObj<ComponentStoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NewsCard: Story = {
  render: ({title, suNewsPublishingDate, suNewsFeaturedMedia, suNewsTopics, node, ...args}) => {
    node.title = title;
    if (suNewsPublishingDate) node.suNewsPublishingDate = {
      offset: "",
      timestamp: Math.round(new Date(suNewsPublishingDate).getTime() / 1000),
      time: new Date(suNewsPublishingDate).toISOString(),
      timezone: "America/Los_Angeles",
    }
    if (suNewsFeaturedMedia === "image") node.suNewsFeaturedMedia = getStoryBookImage()
    if (suNewsFeaturedMedia === "none") node.suNewsFeaturedMedia = undefined

    node.suNewsTopics = [];
    if (suNewsTopics) {
      suNewsTopics.map(name => {
        node.suNewsTopics?.push(getStoryBookTaxonomyTerm(name))
      })
    }
    return <StanfordNewsCard node={node} {...args}/>
  },
  args: {
    title: StanfordNewsData().title,
    suNewsPublishingDate: new Date().getTime(),
    suNewsTopics: ["foo", "bar"],
    suNewsFeaturedMedia: "image",
    headingLevel: "h2",
    node: StanfordNewsData()
  },
};
