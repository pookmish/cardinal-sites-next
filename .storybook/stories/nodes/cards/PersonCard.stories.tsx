import type {Meta, StoryObj} from '@storybook/react';

import StanfordPersonCard from "@components/nodes/cards/stanford-person/stanford-person-card";
import {ImageMedia} from "../../media";
import {DrupalParagraph, DrupalTaxonomyTerm} from "next-drupal";
import {DrupalImageMediaType, DrupalLinkFieldType} from "@lib/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPersonCard> = {
  title: 'Design/Nodes/Cards/Person Card',
  component: StanfordPersonCard,
  tags: ['autodocs'],
  argTypes: {
    su_person_photo: {
      options: ["image", "none"],
      control: {type: "select"}
    },
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
type Story = StoryObj<typeof StanfordPersonCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PersonCard: Story = {
  render: ({headingLevel, path, ...args}) => {
    args.su_person_photo = args.su_page_image === "image" ? ImageMedia() : undefined;

    args.path = {
      alias: path
    }

    return <StanfordPersonCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    su_person_photo: "image",
    body: "body",
    su_person_academic_appt: "su_person_academic_appt",
    su_person_address: "su_person_address",
    su_person_admin_appts: "su_person_admin_appts",
    su_person_affiliations: [{url: "#", title: "su_person_affiliations"}],
    su_person_education: ["su_person_education1", "su_person_education2"],
    su_person_email: "su_person_email",
    su_person_fax: "su_person_fax",
    su_person_first_name: "su_person_first_name",
    su_person_full_title: "su_person_full_title",
    su_person_last_name: "su_person_last_name",
    su_person_links: [{url: "#", title: "su_person_links"}],
    su_person_location_address: "su_person_location_address",
    su_person_location_name: "su_person_location_name",
    su_person_mail_code: "su_person_mail_code",
    su_person_map_url: {url: "#", title: "su_person_map_url"},
    su_person_mobile_phone: "su_person_mobile_phone",
    su_person_profile_link: {url: "#", title: "su_person_profile_link"},
    su_person_research: ["su_person_research1", "su_person_research2"],
    su_person_research_interests: "su_person_research_interests",
    su_person_scholarly_interests: "su_person_scholarly_interests",
    su_person_short_title: "su_person_short_title",
    su_person_telephone: "su_person_telephone",
    su_person_type_group: [{id: 1, name: "su_person_type_group1"}, {id: 2, name: "su_person_type_group2"}],
    su_shared_tags: [{id: 1, name: "su_shared_tags1"}, {id: 2, name: "su_shared_tags2"}],
  },
};
