import type {Meta, StoryObj} from '@storybook/react';

import {ImageMedia, VideoMedia} from "../media";
import CardParagraphDisplay from "@components/paragraphs/stanford-card/card-paragraph-display";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardParagraphDisplay> = {
  title: 'Design/Paragraphs/Card',
  component: CardParagraphDisplay,
  tags: ['autodocs'],
  argTypes: {
    linkStyle: {
      control: {type: "select"},
      options: ["action", "button"]
    },
    media: {
      options: ["image", "video", "none"],
      control: {type: "select"}
    },
    paragraph: {
      control: false,
    }
  }
};

export default meta;
type Story = StoryObj<typeof CardParagraphDisplay>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Card: Story = {
  render: (args) => {
    if (args.media === 'image') {
      const image = ImageMedia();
      args.media = {
        imageUrl: image.field_media_image.image_style_uri.breakpoint_2xl_2x,
        imageAlt: image.field_media_image.resourceIdObjMeta.alt,
      }
    }
    if (args.media === 'video') {
      args.media = {videoUrl: VideoMedia().field_media_oembed_video};
    }
    args.link = {
      url: args.linkUrl,
      title: args.linkTitle,
      style: args.linkStyle,
    }
    return <CardParagraphDisplay {...args}/>
  },
  args: {
    body: "body",
    header: "header",
    linkStyle: 'action',
    linkTitle: "Link Title",
    linkUrl: "http://localhost",
    media: "image",
    supHeader: "supHeader",
  },
};
