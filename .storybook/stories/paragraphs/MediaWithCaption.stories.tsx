import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from "react";
import StanfordMediaCaption from '@components/paragraphs/stanford-media-caption/media-caption-paragraph';
import { getStoryBookImage } from '../storybook-entities';

type ComponentStoryProps = ComponentProps<typeof StanfordMediaCaption> & {
  // text: Text["processed"]
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
  title: 'Design/Paragraphs/MediaCaption',
  component: StanfordMediaCaption,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<ComponentStoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Banner: Story = {
  render: ({ ...args }) => {
    return <StanfordMediaCaption {...args} />
  },
  args: {
    paragraph: {
      id: "aed8df99-4689-46c9-a1ce-2b75a861c707",
      suMediaCaptionCaption: {
        processed: "<p>This is a media with a caption.</p>",
        value: "<p>This is a media with a caption.</p>"
      },
      suMediaCaptionLink: {
        url: "/publications",
        title: "Link.",
        internal: true
      },
      suMediaCaptionMedia: getStoryBookImage(),
      composition: {
        layout: null,
        position: {
          parentId: "a0fda19d-410c-4872-b307-222e9427698f",
          region: "main"
        }
      }
    }
  }
};
