import type {Meta, StoryObj} from '@storybook/react';

import LocalFooter from "@components/config-pages/local-footer";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LocalFooter> = {
  title: 'Design/Config Pages/Local Footer',
  component: LocalFooter,
  tags: ['autodocs'],
  argTypes: {
    su_footer_enabled: {description: "Enabled toggle"},
    su_local_foot_action: {description: "Action Links"},
    su_local_foot_address: {description: "Full physical address"},
    su_local_foot_f_button: {description: "Signup Button Text"},
    su_local_foot_f_intro: {description: "Signup Form Intro"},
    su_local_foot_f_method: {description: "Signup Form Method"},
    su_local_foot_f_url: {description: "Signup Form Action URL"},
    su_local_foot_line_1: {description: "Lockup Line 1"},
    su_local_foot_line_2: {description: "Lockup Line 2"},
    su_local_foot_line_3: {description: "Lockup Line 3"},
    su_local_foot_line_4: {description: "Lockup Line 4"},
    su_local_foot_line_5: {description: "Lockup Line 5"},
    su_local_foot_loc_img: {description: "Logo Image"},
    su_local_foot_loc_link: {description: "Logo Image Link URL"},
    su_local_foot_pr_co: {description: "First Content Block HTML"},
    su_local_foot_primary: {description: "Primary Links"},
    su_local_foot_prime_h: {description: "Primary Links Header"},
    su_local_foot_se_co: {description: "Second Content Block HTML"},
    su_local_foot_second: {description: "Secondary Links"},
    su_local_foot_second_h: {description: "Secondary Links Header"},
    su_local_foot_social: {description: "Social Links"},
    su_local_foot_sunet_t: {description: "Login link text"},
    su_local_foot_tr2_co: {description: "Third Content Block HTML"},
    su_local_foot_tr_co: {description: "Fourth Content Block HTML"},
    su_local_foot_use_loc: {description: "Use Default Lockup"},
    su_local_foot_use_logo: {description: "Use the logo supplied by the theme "},
    su_local_foot_loc_op: {
      description: "Lockup Options",
      options: ['a', 'b', 'd', 'e', 'h', 'i', 'm', 'o', 'p', 'r', 's', 't', 'none'],
      control: {type: "select"}
    },
    configPage: {
      table: {
        disable: true,
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof LocalFooter>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LocalFooterDisplay: Story = {
  render: (args) => {
    return <LocalFooter configPage={args}/>
  },
  args: {
    su_footer_enabled: true,
    su_local_foot_action: [
      {title: "Action link 1", url: "https://localhost"},
      {title: "Action link 2", url: "https://localhost"}
    ],
    su_local_foot_address: {
      additional_name: "additional_name",
      address_line1: "address_line1",
      address_line2: "address_line2",
      administrative_area: "administrative_area",
      country_code: "country_code",
      family_name: "family_name",
      given_name: "given_name",
      locality: "locality",
      organization: "organization",
      postal_code: "postal_code",
      sorting_code: "sorting_code",
    },
    su_local_foot_f_button: "su_local_foot_f_button",
    su_local_foot_f_intro: "su_local_foot_f_intro",
    su_local_foot_f_method: "su_local_foot_f_method",
    su_local_foot_f_url: {title: "Form Action url", url: "https://localhost"},
    su_local_foot_line_1: "su_local_foot_line_1",
    su_local_foot_line_2: "su_local_foot_line_2",
    su_local_foot_line_3: "su_local_foot_line_3",
    su_local_foot_line_4: "su_local_foot_line_4",
    su_local_foot_line_5: "su_local_foot_line_5",
    su_local_foot_loc_img: null,
    su_local_foot_loc_link: {title: "su_local_foot_loc_link", url: "https://localhost"},
    su_local_foot_loc_open: "su_local_foot_loc_open",
    su_local_foot_pr_co: "su_local_foot_pr_co",
    su_local_foot_primary: [
      {title: "Primary link 1", url: "https://localhost"},
      {title: "Primary link 2", url: "https://localhost"}
    ],
    su_local_foot_prime_h: "su_local_foot_prime_h",
    su_local_foot_se_co: "su_local_foot_se_co",
    su_local_foot_second: [
      {title: "Second Link 1", url: "https://localhost"},
      {title: "Second Link 2", url: "https://localhost"}
    ],
    su_local_foot_second_h: "su_local_foot_second_h",
    su_local_foot_social: [
      {title: "Facebook", url: "https://localhost"},
      {title: "YouTube", url: "https://localhost"}
    ],
    su_local_foot_sunet_t: "su_local_foot_sunet_t",
    su_local_foot_tr2_co: "su_local_foot_tr2_co",
    su_local_foot_tr_co: "su_local_foot_tr_co",
    su_local_foot_use_loc: true,
    su_local_foot_use_logo: true,
    su_local_foot_loc_op: "su_local_foot_loc_op",
  },
};
