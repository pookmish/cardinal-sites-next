import type {Meta, StoryObj} from '@storybook/react';

import StanfordPolicyCard from "@components/nodes/cards/stanford-policy/stanford-policy-card";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPolicyCard> = {
  title: 'Design/Nodes/Cards/Policy Card',
  component: StanfordPolicyCard,
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
type Story = StoryObj<typeof StanfordPolicyCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PolicyCard: Story = {
  render: ({headingLevel, body, summary, ...args}) => {
    args.body = {
      body,
      summary
    }
    return <StanfordPolicyCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    body: "Portaest pellentesque elementum portaest gravida adipiscing fusce pellentesque placerat scelerisque tortor facilisis ex magna elit maecenas nec adipiscing pellentesque sollicitudin scelerisque sed tempus molestie rutrum.",
    summary: "Portaest pellentesque elementum portaest gravida adipiscing",
    suPolicyAuthority: "su_policy_authority",
    suPolicyChapter: "su_policy_chapter",
    suPolicyEffective: {value: Math.round(new Date().getTime() / 1000)},
    suPolicyPolicyNum: "su_policy_policy_num",
    suPolicySubchapter: "su_policy_subchapter",
    suPolicyTitle: "su_policy_title",
    suPolicyUpdated: {value:  Math.round(new Date().getTime() / 1000)},
  },
};
