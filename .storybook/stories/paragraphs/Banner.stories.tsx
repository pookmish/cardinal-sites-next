import type {Meta, StoryObj} from '@storybook/react';
import {ImageMedia} from "../media";

// @ts-ignore
import BannerParagraphDisplay from "@components/paragraphs/stanford-banner/banner-paragraph-display";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BannerParagraphDisplay> = {
  title: 'Design/Paragraphs/Banner',
  component: BannerParagraphDisplay,
  tags: ['autodocs'],
  argTypes: {
    media: {
      options: ["image", "none"],
      control: {type: "select"}
    }
  }
};

export default meta;
type Story = StoryObj<typeof BannerParagraphDisplay>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Banner: Story = {
  render: (args) => {
    const image = ImageMedia();
    args.media = args.media === 'image' ? {
      imageUrl: image.mediaImage.url,
      imageAlt: image.mediaImage.alt
    }: undefined;
    args.link = {
      url: args.linkUrl,
      title: args.linkTitle,
    }
    return <BannerParagraphDisplay {...args}/>
  },
  args: {
    media: "image",
    header: "header",
    supHeader: "supHeader",
    body: "body",
    linkUrl:"http://localhost",
    linkTitle: "Link Title",
  },
};
