import type {Meta, StoryObj} from '@storybook/react';

import StanfordPublicationCard from "@components/nodes/cards/stanford-publication/stanford-publication-card";
import {ImageMedia} from "../../media";
import {StanfordPublicationData} from "../StanfordPublication.data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPublicationCard> = {
  title: 'Design/Nodes/Cards/Publication Card',
  component: StanfordPublicationCard,
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
type Story = StoryObj<typeof StanfordPublicationCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PublicationCard: Story = {
  args: {
    headingLevel: "h2",
    node: StanfordPublicationData()
  },
};
