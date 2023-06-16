import type {Meta, StoryObj} from '@storybook/react';

import StanfordNewsCard from "@components/nodes/cards/stanford-news/stanford-news-card";
import {ImageMedia, VideoMedia} from "../../media";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordNewsCard> = {
  title: 'Design/Nodes/Cards/News Card',
  component: StanfordNewsCard,
  tags: ['autodocs'],
  argTypes: {
    su_news_banner: {
      options: ["image", "video", "none"],
      control: {type: "select"}
    },
    su_news_featured_media: {
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
  render: ({headingLevel, path, ...args}) => {
    if (args.su_news_featured_media === 'image') {
      args.su_news_featured_media = ImageMedia();
    }
    if (args.su_news_featured_media === 'video') {
      args.su_news_featured_media = VideoMedia();
    }

    if (args.su_news_banner === 'image') {
      args.su_news_banner = ImageMedia();
    }
    if (args.su_news_banner === 'video') {
      args.su_news_banner = VideoMedia();
    }

    args.path = {
      alias: path
    }
    return <StanfordNewsCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    su_news_banner: "image",
    su_news_featured_media: "image",
    su_news_publishing_date: new Date().toLocaleDateString(),
    su_news_banner_media_caption: "su_news_banner_media_caption",
    su_news_byline: "su_news_byline",
    su_news_dek: "su_news_dek",
    su_news_topics: [
      {id: 1, name: "su_news_topics 1"},
      {id: 2, name: "su_news_topics 2"},
      {id: 3, name: "su_news_topics 3"},
    ],
    su_shared_tags: [{id: 1, name: "su_shared_tags1"}, {id: 2, name: "su_shared_tags2"}],
    su_news_hide_social: false,
  },
};
