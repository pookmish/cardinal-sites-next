import type {Meta, StoryObj} from '@storybook/react';
import BannerParagraphDisplay from "@components/paragraphs/stanford-banner/banner-paragraph-display";
import {ComponentProps} from "react";
import {getStoryBookImage} from "../storybook-entities";

type ComponentStoryProps = ComponentProps<typeof BannerParagraphDisplay> & {
  linkUrl?: string
  linkTitle?: string
  mediaChoice?: string
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
  title: 'Design/Paragraphs/Banner',
  component: BannerParagraphDisplay,
  tags: ['autodocs'],
  argTypes: {
    mediaChoice: {
      options: ["image", "none"],
      control: {type: "select"}
    }
  }
};

export default meta;
type Story = StoryObj<ComponentStoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Banner: Story = {
  render: ({linkUrl, linkTitle, mediaChoice, ...args}) => {
    const image = getStoryBookImage();
    args.media = mediaChoice === 'image' ? {
      imageUrl: image.mediaImage.url,
      imageAlt: image.mediaImage.alt
    } : undefined;
    args.link = {
      url: linkUrl,
      title: linkTitle,
      internal: false,
    }
    return <BannerParagraphDisplay {...args}/>
  },
  args: {
    mediaChoice: "image",
    header: "header",
    supHeader: "supHeader",
    body: "body",
    linkUrl: "http://localhost",
    linkTitle: "Link Title",
  },
};
