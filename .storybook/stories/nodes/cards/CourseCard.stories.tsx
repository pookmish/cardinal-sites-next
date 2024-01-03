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
  render: ({headingLevel, ...args}) => {
    return <StanfordCourseCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    body: {processed: "body"},
    suCourseAcademicYear: "2022-2023",
    suCourseCode: "271",
    suCourseId: "222980",
    suCourseInstructors: ["su_course_instructors1", "su_course_instructors2"],
    suCourseLink:{url: "#", title: "su_course_link"},
    suCourseQuarters: [{id: 1, name: "Spring"}, {id: 1, name: "Autumn"}],
    suCourseSectionUnits: 5,
    suCourseSubject: {id: 1, name: "su_course_subject"},
    suCourseTags: [{id:1, name: "su_course_tags1"}, {id:1, name: "su_course_tags2"}],
    suSharedTags: [{id:1, name: "su_shared_tags1"}, {id:1, name: "su_shared_tags2"}]
  },
};
