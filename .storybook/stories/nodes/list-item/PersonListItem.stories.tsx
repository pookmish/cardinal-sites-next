import type {Meta, StoryObj} from '@storybook/react';

import StanfordPersonListItem from "@components/nodes/list-item/stanford-person/stanford-person-list-item";
import {ImageMedia} from "../../media";
import {PersonCard} from "../cards/PersonCard.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPersonListItem> = {
  title: 'Design/Nodes/List Item/Course List Item',
  component: StanfordPersonListItem,
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
type Story = StoryObj<typeof StanfordPersonListItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PersonListItem: Story = {
  args: {...PersonCard.args},
  render: ({headingLevel, path, ...args}) => {
    args.su_page_image = args.su_page_image === "image" ? ImageMedia() : undefined;
    args.path = {
      alias: path
    }
    return <StanfordPersonListItem node={args} headingLevel={headingLevel}/>
  },
};
