import type {Meta, StoryObj} from '@storybook/react';

import MainMenu from "@components/menu/main-menu";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MainMenu> = {
  title: 'Design/Menu/Main Menu',
  component: MainMenu,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof MainMenu>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const MainMenuComponent: Story = {
  args: {
    menuItems: [
      {id: 1, title: "First Item", url: "#"},
      {
        id: 4,
        title: "Parent Item",
        url: "#",
        items: [
          {id: 5, title: "First Item", url: "#"},
          {
            id: 6,
            title: "Second Item",
            url: "#",
            items: [
              {id: 8, title: "First Item", url: "#"},
              {id: 9, title: "Second Item", url: "#"},
              {id: 10, title: "Third Item", url: "#"},
            ]
          },
          {id: 7, title: "Third Item", url: "#"},
        ]
      },
      {id: 2, title: "Second Item", url: "#"},
      {id: 3, title: "Third Item", url: "#"},
    ]
  },
};
