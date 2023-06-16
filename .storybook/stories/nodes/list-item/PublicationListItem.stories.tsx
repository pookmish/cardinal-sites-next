import type {Meta, StoryObj} from '@storybook/react';

import StanfordPublicationListItem
  from "@components/nodes/list-item/stanford-publication/stanford-publication-list-item";
import {ImageMedia} from "../../media";
import {PublicationCard} from "../cards/PublicationCard.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPublicationListItem> = {
  title: 'Design/Nodes/List Item/Publication List Item',
  component: StanfordPublicationListItem,
  tags: ['autodocs'],
  argTypes: {
    su_page_image: {
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
type Story = StoryObj<typeof StanfordPublicationListItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PublicationListItem: Story = {
  args: {...PublicationCard.args},
  render: ({headingLevel, path, ...args}) => {
    args.su_page_image = args.su_page_image === "image" ? ImageMedia() : undefined;
    args.path = {
      alias: path
    }
    return <StanfordPublicationListItem node={args} headingLevel={headingLevel}/>
  },
};
