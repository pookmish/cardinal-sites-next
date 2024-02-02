import type {Meta, StoryObj} from '@storybook/react';
import StanfordPageCard from "@components/nodes/cards/stanford-page/stanford-page-card";
import {StanfordPageData} from "../StanfordPage.data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPageCard> = {
  title: 'Design/Nodes/Cards/Stanford Page Card',
  component: StanfordPageCard,
  tags: ['autodocs'],
  argTypes: {
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
  args: {
    headingLevel: "h2",
    node: StanfordPageData()
  },
};
