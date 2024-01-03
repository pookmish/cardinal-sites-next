import type {Meta, StoryObj} from '@storybook/react';

import StanfordNewsCard from "@components/nodes/cards/stanford-news/stanford-news-card";
import {ImageMedia, VideoMedia} from "../../media";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordNewsCard> = {
  title: 'Design/Nodes/Cards/News Card',
  component: StanfordNewsCard,
  tags: ['autodocs'],
  argTypes: {
    suNewsBanner: {
      options: ["image", "video", "none"],
      control: {type: "select"}
    },
    suNewsFeaturedMedia: {
      options: ["image", "video", "none"],
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
type Story = StoryObj<typeof StanfordNewsCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NewsCard: Story = {
  render: ({headingLevel, ...args}) => {

    if (args.suNewsFeaturedMedia === 'image') {
      args.suNewsFeaturedMedia = ImageMedia();
    } else if (args.suNewsFeaturedMedia === 'video') {
      args.suNewsFeaturedMedia = VideoMedia();
    } else {
      args.suNewsFeaturedMedia = undefined
    }

    if (args.suNewsBanner === 'image') {
      args.suNewsBanner = ImageMedia();
    } else if (args.suNewsBanner === 'video') {
      args.suNewsBanner = VideoMedia();
    } else {
      args.suNewsBanner = undefined
    }

    return <StanfordNewsCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    suNewsBanner: "image",
    suNewsFeaturedMedia: "image",
    suNewsPublishingDate: {value: new Date().toLocaleDateString()},
    suNewsBannerMediaCaption: "su_news_banner_media_caption",
    suNewsByline: "su_news_byline",
    suNewsDek: "su_news_dek",
    suNewsTopics: [
      {id: 1, name: "su_news_topics 1"},
      {id: 2, name: "su_news_topics 2"},
      {id: 3, name: "su_news_topics 3"},
    ],
    suSharedTags: [{id: 1, name: "su_shared_tags1"}, {id: 2, name: "su_shared_tags2"}],
    suNewsHideSocial: false,
  },
};
