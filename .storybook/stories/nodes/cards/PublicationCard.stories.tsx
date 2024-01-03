import type {Meta, StoryObj} from '@storybook/react';

import StanfordPublicationCard from "@components/nodes/cards/stanford-publication/stanford-publication-card";
import {ImageMedia} from "../../media";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPublicationCard> = {
  title: 'Design/Nodes/Cards/Publication Card',
  component: StanfordPublicationCard,
  tags: ['autodocs'],
  argTypes: {
    suPublicationImage: {
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
type Story = StoryObj<typeof StanfordPublicationCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PublicationCard: Story = {
  render: ({headingLevel, ...args}) => {
    args.suPublicationImage = args.suPublicationImage === "image" ? ImageMedia() : undefined;
    return <StanfordPublicationCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    suPublicationImage: "image",
    suPublicationCta: {url: "#", title: "su_publication_cta"},
    suPublicationTopics: [{id: 1, name: "su_publication_topics1"}, {id: 2, name: "su_publication_topics2"}]
  },
};
