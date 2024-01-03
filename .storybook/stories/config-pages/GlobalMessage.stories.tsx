import type {Meta, StoryObj} from '@storybook/react';

import GlobalMessage from "../../../src/components/config-pages/global-message";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof GlobalMessage> = {
  title: 'Design/Config Pages/Global Message',
  component: GlobalMessage,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'The type of global message',
      options: ['info', 'success', 'warning', 'error', 'plain'],
      control: {type: 'select'}
    },
    message: {
      description: "General message html text",
    },
    label: {
      description: "Text placed to the right of the icon"
    },
    header: {
      description: "H2 element at the top."
    },
    linkText: {
      description: "Link text for the bottom link"
    },
    linkUrl: {
      description: "Absolute or relative url"
    },
    enabled: {
      description: "Toggle the display on or off"
    },
    link: {
      table: {
        disable: true,
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof GlobalMessage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SuccessMessage: Story = {
  render: ({linkUrl, linkText, ...args}) => {
    if(linkUrl && linkText) {
      args.link = {
        title: linkText,
        url: linkUrl,
        uri: linkUrl,
      }
    }
    return <GlobalMessage {...args}/>
  },
  args: {
    type: 'success',
    message: '<p>Rutrum nec ipsum lacus portaest cursus orci dolor gravida gravida eget nulla ipsum elementum leo enim vivamus quam lorem tempus quis cursus sem nec pellentesque. <a href="#">Link text</a></p><p><a class="su-button" href="#">Button text</a></p><p><a class="su-button--secondary" href="#">Secondary text</a></p>',
    label: 'Placerat lacus ut eget leo.',
    header: 'Accumsan eget amet id sollicitudin.',
    linkText: 'Sem quisque placerat quis suspendisse.',
    linkUrl: 'http://localhost',
    enabled: true,
  },
};

export const InfoMessage: Story = {
  render: SuccessMessage.render,
  args: {
    ...SuccessMessage.args,
    type: "info",
  }
}

export const ErrorMessage: Story = {
  render: SuccessMessage.render,
  args: {
    ...SuccessMessage.args,
    type: "error",
  }
}

export const WarningMessage: Story = {
  render: SuccessMessage.render,
  args: {
    ...SuccessMessage.args,
    type: "warning",
  }
}


export const PlainMessage: Story = {
  render: SuccessMessage.render,
  args: {
    ...SuccessMessage.args,
    type: "plain",
  }
}
