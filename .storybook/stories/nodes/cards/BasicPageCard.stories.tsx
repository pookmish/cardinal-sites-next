import type {Meta, StoryObj} from '@storybook/react';

import StanfordPageCard from "../../../../src/components/nodes/cards/stanford-page/stanford-page-card";
import {ImageMedia} from "../../media";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPageCard> = {
  title: 'Design/Nodes/Cards/Stanford Page Card',
  component: StanfordPageCard,
  tags: ['autodocs'],
  argTypes: {
    suPageImage: {
      options: ["image", "none"],
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
type Story = StoryObj<typeof StanfordPageCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PageCard: Story = {
  render: ({headingLevel, ...args}) => {
    args.suPageImage = args.suPageImage === "image" ? ImageMedia() : undefined;
    return <StanfordPageCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    suPageImage: "image",
    path: "/foo-bar",
    title: "title",
    suPageDescription: "su_page_description",
  },
};
