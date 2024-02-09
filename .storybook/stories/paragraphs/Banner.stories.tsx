import type {Meta, StoryObj} from '@storybook/react';
import BannerParagraphDisplay from "@components/paragraphs/stanford-banner/banner-paragraph-display";
import {ComponentProps} from "react";

type ComponentStoryProps = ComponentProps<typeof BannerParagraphDisplay> & {
  linkUrl?: string
  linkTitle?: string
  imageUrl?: string
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
  title: 'Design/Paragraphs/Banner',
  component: BannerParagraphDisplay,
  tags: ['autodocs'],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<ComponentStoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Banner: Story = {
  render: ({linkUrl, linkTitle, imageUrl, ...args}) => {
    args.link = {
      url: linkUrl,
      title: linkTitle,
      internal: false,
    }
    return <BannerParagraphDisplay {...args}/>
  },
  args: {
    imageUrl: "image",
    header: "header",
    supHeader: "supHeader",
    body: "body",
    linkUrl: "http://localhost",
    linkTitle: "Link Title",
  },
};
