import type {Meta, StoryObj} from '@storybook/react';

import StanfordPageListItem from "@components/nodes/list-item/stanford-page/stanford-page-list-item";
import {ImageMedia} from "../../media";
import {PageCard} from "../cards/BasicPageCard.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPageListItem> = {
  title: 'Design/Nodes/List Item/Stanford Page List Item',
  component: StanfordPageListItem,
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
type Story = StoryObj<typeof StanfordPageListItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PageListItem: Story = {
  args: {...PageCard.args},
  render: ({headingLevel, path, ...args}) => {
    args.su_page_image = args.su_page_image === "image" ? ImageMedia() : undefined;

    args.path = {
      alias: path
    }

    return <StanfordPageListItem node={args} headingLevel={headingLevel}/>
  },
};
