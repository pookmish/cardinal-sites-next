import type {Meta, StoryObj} from '@storybook/react';

import {ImageMedia, VideoMedia} from "../media";
// @ts-ignore
import MediaCaptionParagraphDisplay from "@components/paragraphs/stanford-media-caption/media-caption-paragraph-display";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MediaCaptionParagraphDisplay> = {
  title: 'Design/Paragraphs/Media Caption',
  component: MediaCaptionParagraphDisplay,
  tags: ['autodocs'],
  argTypes: {
    media: {
      options: ["image", "video", "none"],
      control: {type: "select"}
    }
  }
};

export default meta;
type Story = StoryObj<typeof MediaCaptionParagraphDisplay>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const MediaCaption: Story = {
  render: (args) => {
    if (args.media === 'image') {
      const image = ImageMedia();
      args.media = {
        imageUrl: image.mediaImage.url,
        imageAlt: image.mediaImage.alt,
      }
    }
    if (args.media === 'video') {
      args.media = {videoUrl: VideoMedia().mediaOembedVideo};
    }
    args.link = {
      url: args.linkUrl,
      title: args.linkTitle,
      style: args.linkStyle,
    }
    return <MediaCaptionParagraphDisplay {...args}/>
  },
  args: {
    caption: "caption",
    linkTitle: "Link Title",
    linkUrl: "http://localhost",
    media: "image",
  },
};
