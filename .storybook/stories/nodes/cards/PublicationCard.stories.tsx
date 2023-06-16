import type {Meta, StoryObj} from '@storybook/react';

import StanfordPublicationCard from "@components/nodes/cards/stanford-publication/stanford-publication-card";
import {ImageMedia} from "../../media";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPublicationCard> = {
  title: 'Design/Nodes/Cards/Publication Card',
  component: StanfordPublicationCard,
  tags: ['autodocs'],
  argTypes: {
    su_publication_image: {
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
  render: ({headingLevel, path, ...args}) => {
    args.path = {
      alias: path
    }
    args.su_publication_image = args.su_publication_image === "image" ? ImageMedia() : undefined;
    return <StanfordPublicationCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    su_publication_image: "image",
    su_publication_cta: {url: "#", title: "su_publication_cta"},
    su_publication_topics: [{id: 1, name: "su_publication_topics1"}, {id: 2, name: "su_publication_topics2"}]
  },
};
