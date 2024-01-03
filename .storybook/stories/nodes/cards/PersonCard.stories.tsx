import type {Meta, StoryObj} from '@storybook/react';

import StanfordPersonCard from "@components/nodes/cards/stanford-person/stanford-person-card";
import {ImageMedia} from "../../media";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordPersonCard> = {
  title: 'Design/Nodes/Cards/Person Card',
  component: StanfordPersonCard,
  tags: ['autodocs'],
  argTypes: {
    suPersonPhoto: {
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
  render: ({headingLevel, ...args}) => {
    args.suPersonPhoto = args.suPersonPhoto === "image" ? ImageMedia() : undefined;

    return <StanfordPersonCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    suPersonPhoto: "image",
    body: {processed: "body"},
    suPersonAcademicAppt: "su_person_academic_appt",
    suPersonAdminAppts: "su_person_admin_appts",
    suPersonAffiliations: [{url: "#", title: "su_person_affiliations"}],
    suPersonEducation: ["su_person_education1", "su_person_education2"],
    suPersonEmail: "su_person_email",
    suPersonFax: "su_person_fax",
    suPersonFirstName: "su_person_first_name",
    suPersonFullTitle: "su_person_full_title",
    suPersonLastName: "su_person_last_name",
    suPersonLinks: [{url: "#", title: "su_person_links"}],
    suPersonLocationAddress: {processed: "su_person_location_address"},
    suPersonLocationName: "su_person_location_name",
    suPersonMailCode: "su_person_mail_code",
    suPersonMapUrl: {url: "#", title: "su_person_map_url"},
    suPersonMobilePhone: "su_person_mobile_phone",
    suPersonProfileLink: {url: "#", title: "su_person_profile_link"},
    suPersonPronouns: "Dr",
    suPersonResearch: ["su_person_research1", "su_person_research2"],
    suPersonResearchInterests: "su_person_research_interests",
    suPersonScholarlyInterests: "su_person_scholarly_interests",
    suPersonShortTitle: "su_person_short_title",
    suPersonTelephone: "su_person_telephone",
    suPersonTypeGroup: [{id: 1, name: "su_person_type_group1"}, {id: 2, name: "su_person_type_group2"}],
    suSharedTags: [{id: 1, name: "su_shared_tags1"}, {id: 2, name: "su_shared_tags2"}],
  },
};
