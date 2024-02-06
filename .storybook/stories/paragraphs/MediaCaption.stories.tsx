import type {Meta, StoryObj} from '@storybook/react';
import MediaCaptionParagraphDisplay from "@components/paragraphs/stanford-media-caption/media-caption-paragraph-display";
import {ComponentProps} from "react";
import {getStoryBookImage, getStoryBookVideo} from "../storybook-entities";

type ComponentStoryProps = ComponentProps<typeof MediaCaptionParagraphDisplay> & {
  mediaChoice: string
  linkUrl?: string
  linkTitle?: string
  linkStyle?: string
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
  title: 'Design/Paragraphs/Media Caption',
  component: MediaCaptionParagraphDisplay,
  tags: ['autodocs'],
  argTypes: {
    mediaChoice: {
      options: ["image", "video", "none"],
      control: {type: "select"}
    }
  }
};

export default meta;
type Story = StoryObj<ComponentStoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const MediaCaption: Story = {
  render: ({mediaChoice, linkUrl, linkTitle, linkStyle, ...args}) => {
    if (mediaChoice === 'image') {
      const image = getStoryBookImage();
      args.media = {
        imageUrl: image.mediaImage.url,
        imageAlt: image.mediaImage.alt,
      }
    }
    if (mediaChoice === 'video') {
      args.media = {videoUrl: getStoryBookVideo().mediaOembedVideo};
    }
    if (linkUrl && linkTitle) {
      args.link = {
        url: linkUrl,
        title: linkTitle,
        internal: false,
      }
    }
    return <MediaCaptionParagraphDisplay {...args}/>
  },
  args: {
    caption: "caption",
    linkTitle: "Link Title",
    linkUrl: "http://localhost",
    mediaChoice: "image",
  },
};
