import type {Meta, StoryObj} from '@storybook/react';

import SideNav from "@components/menu/side-nav";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SideNav> = {
  title: 'Design/Menu/Side Nav',
  component: SideNav,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof SideNav>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SideNavComponent: Story = {
  args: {
    menuItems: [
      {id: 1, title: "First Item", url: "#"},
      {
        id: 4,
        title: "Parent Item",
        url: "/foo",
        items: [
          {id: 5, title: "First Item", url: "/foo/bar"},
          {
            id: 6,
            title: "Second Item",
            url: "/foo/baz",
            items: [
              {id: 8, title: "First Item", url: "/foo/baz/foo"},
              {id: 9, title: "Second Item", url: "/foo/baz/bar"},
              {id: 10, title: "Third Item", url: "/foo/baz/bin"},
            ]
          },
          {id: 7, title: "Third Item", url: "/foo/bin"},
        ]
      },
      {id: 2, title: "Second Item", url: "/bar"},
      {id: 3, title: "Third Item", url: "/baz"},
    ],
    currentPath: "/foo/baz/bin",
  },
};
