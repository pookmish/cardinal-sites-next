import type {Meta, StoryObj} from '@storybook/react';

import SuperFooter from "@components/config-pages/super-footer";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SuperFooter> = {
  title: 'Design/Config Pages/Super Footer',
  component: SuperFooter,
  tags: ['autodocs'],
  argTypes: {
    su_super_foot_enabled: {description: "Display Enabled"},
    su_super_foot_intranet: {description: "Intranet Link"},
    su_super_foot_link: {description: "Footer Links"},
    su_super_foot_text: {description: "Text block HTML"},
    su_super_foot_title: {description: "Super Footer Title"},
    configPage: {
      table: {
        disable: true,
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof SuperFooter>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SuperFooterDisplay: Story = {
  render: (args) => {
    return <SuperFooter configPage={args}/>
  },
  args: {
    su_super_foot_enabled: true,
    su_super_foot_intranet: {title: "su_super_foot_intranet", url: "http://localhost"},
    su_super_foot_link: [{title: "su_super_foot_link", url: "http://localhost"}],
    su_super_foot_text: "su_super_foot_text",
    su_super_foot_title: "su_super_foot_title",
  },
};
