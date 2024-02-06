import type {Meta, StoryObj} from '@storybook/react';
import StanfordPublicationCard from "@components/nodes/cards/stanford-publication/stanford-publication-card";
import {StanfordPublicationData} from "../StanfordPublication.data";
import {ComponentProps} from "react";
import {getStoryBookTaxonomyTerm} from "../../storybook-entities";

type ComponentStoryProps = ComponentProps<typeof StanfordPublicationCard> & {
  title: string
  suPublicationTopics?: string[]
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
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
type Story = StoryObj<ComponentStoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PublicationCard: Story = {
  render: ({title, suPublicationTopics, node, ...args}) => {
    node.title = title
    node.suPublicationTopics = []
    if (suPublicationTopics) {
      suPublicationTopics.map(name => node.suPublicationTopics?.push(getStoryBookTaxonomyTerm(name)))
    }
    return <StanfordPublicationCard node={node} {...args}/>
  },
  args: {
    title: StanfordPublicationData().title,
    suPublicationTopics: ["foo", "bar"],
    headingLevel: "h2",
    node: StanfordPublicationData()
  },
};
