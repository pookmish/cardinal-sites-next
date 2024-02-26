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
      id:"6fa23537-dda7-4861-930a-648445d9904c",
      suMediaCaptionCaption: {
        processed:"<p>Here is my caption.</p>"
      },
      suMediaCaptionLink: {
        title:"Link text.",
        url:"/publications",
        internal:true
      },
      suMediaCaptionMedia: getStoryBookImage(),
    }
  }
};
