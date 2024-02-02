import type {Meta, StoryObj} from '@storybook/react';

import StanfordPolicyCard from "@components/nodes/cards/stanford-policy/stanford-policy-card";
import {StanfordPolicyData} from "../StanfordPolicy.data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPolicyCard> = {
  title: 'Design/Nodes/Cards/Policy Card',
  component: StanfordPolicyCard,
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
type Story = StoryObj<typeof StanfordPolicyCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PolicyCard: Story = {
  args: {
    headingLevel: "h2",
    node: StanfordPolicyData()
  },
};
