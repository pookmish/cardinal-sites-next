import type {Meta, StoryObj} from '@storybook/react';
import CardParagraphDisplay from "@components/paragraphs/stanford-card/card-paragraph-display";
import {ComponentProps} from "react";
import {getStoryBookImage, getStoryBookVideo} from "../storybook-entities";

type ComponentStoryProps = ComponentProps<typeof CardParagraphDisplay> & {
  linkUrl?: string
  linkTitle?: string
  mediaChoice?: string
  linkStyle?: 'action' | 'button'
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
  title: 'Design/Paragraphs/Card',
  component: CardParagraphDisplay,
  tags: ['autodocs'],
  argTypes: {
    linkStyle: {
      control: {type: "select"},
      options: ["action", "button"]
    },
    mediaChoice: {
      options: ["image", "video", "none"],
      control: {type: "select"}
    }
  }
};

export default meta;
type Story = StoryObj<ComponentStoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Card: Story = {
  render: ({mediaChoice, ...args}) => {
    if (mediaChoice === 'image') {
      const image = getStoryBookImage();
      args.image = {
        url: image.mediaImage.url,
        alt: image.mediaImage.alt,
      }
    }
    if (mediaChoice === 'video') {
      args.videoUrl = getStoryBookVideo().mediaOembedVideo;
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
    mediaChoice: "image",
    supHeader: "supHeader",
  },
};
