import type {Meta, StoryObj} from '@storybook/react';

import StanfordCourseCard from "@components/nodes/cards/stanford-course/stanford-course-card";

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
  render: ({headingLevel, path, ...args}) => {
    args.path = {
      alias: path
    }

    return <StanfordCourseCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    body: "body",
    su_course_academic_year: "2022-2023",
    su_course_code: "271",
    su_course_id: "222980",
    su_course_instructors: ["su_course_instructors1", "su_course_instructors2"],
    su_course_link:{url: "#", title: "su_course_link"},
    su_course_quarters: [{id: 1, name: "Spring"}, {id: 1, name: "Autumn"}],
    su_course_section_units: 5,
    su_course_subject: {id: 1, name: "su_course_subject"},
    su_course_tags: [{id:1, name: "su_course_tags1"}, {id:1, name: "su_course_tags2"}],
    su_shared_tags: [{id:1, name: "su_shared_tags1"}, {id:1, name: "su_shared_tags2"}]
  },
};
