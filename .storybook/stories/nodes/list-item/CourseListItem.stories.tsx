import type {Meta, StoryObj} from '@storybook/react';

import StanfordCourseListItem from "@components/nodes/list-item/stanford-course/stanford-course-list-item";
import {CourseCard} from "../cards/CourseCard.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordCourseListItem> = {
  title: 'Design/Nodes/List Item/Course List Item',
  component: StanfordCourseListItem,
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
type Story = StoryObj<typeof StanfordCourseListItem>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CourseListItem: Story = {
  args: {...CourseCard.args},
  render: ({headingLevel, path, ...args}) => {
    args.path = {
      alias: path
    }
    return <StanfordCourseListItem node={args} headingLevel={headingLevel}/>
  },
};
