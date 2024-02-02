import type {Meta, StoryObj} from '@storybook/react';

import StanfordCourseCard from "@components/nodes/cards/stanford-course/stanford-course-card";
import {StanfordCourseData} from "../StanfordCourse.data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordCourseCard> = {
  title: 'Design/Nodes/Cards/Course Card',
  component: StanfordCourseCard,
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
type Story = StoryObj<typeof StanfordCourseCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CourseCard: Story = {
  args: {
    headingLevel: "h2",
    node: StanfordCourseData()
  },
};
