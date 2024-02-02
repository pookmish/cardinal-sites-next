import type {Meta, StoryObj} from '@storybook/react';

import StanfordPersonCard from "@components/nodes/cards/stanford-person/stanford-person-card";
import {StanfordPersonData} from "../StanfordPerson.data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPersonCard> = {
  title: 'Design/Nodes/Cards/Person Card',
  component: StanfordPersonCard,
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
type Story = StoryObj<typeof StanfordPersonCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PersonCard: Story = {
  args: {
    headingLevel: "h2",
    node: StanfordPersonData()
  },
};
