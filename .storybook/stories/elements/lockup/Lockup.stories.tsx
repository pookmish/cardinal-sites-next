import type {Meta, StoryObj} from '@storybook/react';
import Lockup from "@components/elements/lockup/lockup";
import {lock} from "next/dist/client/components/react-dev-overlay/internal/components/Overlay/body-locker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Lockup> = {
  title: 'Design/Elements/Lockup',
  component: Lockup,
  tags: ['autodocs'],
  argTypes: {
    option: {
      options: ['a', 'b', 'd', 'e', 'h', 'i', 'm', 'o', 'p', 'r', 's', 't', 'none'],
      control: {type: "select"}
    },
    siteSettings: {
      control: false,
    },
    lockupSettings: {
      control: false,
    }
  }
};

export default meta;
type Story = StoryObj<typeof Lockup>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LockupDisplay: Story = {
  render: (args) => {
    const lockupSettings = {
      su_use_theme_logo: args.themeLogo,
      su_lockup_options: args.option,
      su_lockup_enabled: args.enabled,
      su_line_1: args.line1,
      su_line_2: args.line2,
      su_line_3: args.line3,
      su_line_4: args.line4,
      su_line_5: args.line5,
      su_upload_logo_image: {
        image_style_uri: {
          responsive_medium: args.logoUrl
        }
      }
    }
    const siteSettings = {
      siteName: args.siteName,
    }
    return <Lockup siteSettings={siteSettings} lockupSettings={lockupSettings}/>
  },
  args: {
    line1: 'Line 1',
    line2: 'Line 2',
    line3: 'Line 3',
    line4: 'Line 4',
    line5: 'Line 5',
    siteName: "Site Name",
    themeLogo: true,
    logoUrl: "https://placekitten.com/300/50",
    enabled: false,
    option: 'none',
  },
};

export const LockupA: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "a"
  }
}
export const LockupB: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "b"
  }
}
export const LockupD: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "d"
  }
}
export const LockupE: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "e"
  }
}
export const LockupH: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "h"
  }
}
export const LockupI: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "i"
  }
}
export const LockupM: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "m"
  }
}
export const LockupN: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "n"
  }
}
export const LockupO: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "o"
  }
}
export const LockupP: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "p"
  }
}
export const LockupR: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "r"
  }
}
export const LockupS: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "s"
  }
}
export const LockupT: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "t"
  }
}
export const LockupNone: Story = {
  render: LockupDisplay.render,
  args: {
    ...LockupDisplay.args,
    option: "none"
  }
}
