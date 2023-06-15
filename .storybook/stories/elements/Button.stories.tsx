import type { Meta, StoryObj } from '@storybook/react';

import Button from "@components/elements/button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Design/Elements/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    href: {
      description: "Link url"
    },
    buttonElem: {
      description: "Use a <button> element"
    },
    children: {
      description: "String, markup or JSX Element for the link/button"
    },
    big: {
      description: "Big button"
    },
    secondary: {
      description: "Secondary button style"
    },
    centered: {
      description: "Center the button"
    },
    className: {
      control: false
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ButtonElement: Story = {
  args: {
    children: 'Button Text',
  },
};
