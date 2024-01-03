import type {Meta, StoryObj} from '@storybook/react';

import StanfordPolicyListItem from "@components/nodes/list-item/stanford-policy/stanford-policy-list-item";
import {ImageMedia} from "../../media";
import {PolicyCard} from "../cards/PolicyCard.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPolicyListItem> = {
  title: 'Design/Nodes/List Item/Policy List Item',
  component: StanfordPolicyListItem,
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
type Story = StoryObj<typeof StanfordPolicyListItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PolicyListItem: Story = {
  args: {...PolicyCard.args},
  render: ({headingLevel, ...args}) => {
    return <StanfordPolicyListItem node={args} headingLevel={headingLevel}/>
  },
};
