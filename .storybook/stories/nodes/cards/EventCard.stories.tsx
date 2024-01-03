import type {Meta, StoryObj} from '@storybook/react';

import StanfordEventCard from "@components/nodes/cards/stanford-event/stanford-event-card";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StanfordEventCard> = {
  title: 'Design/Nodes/Cards/Event Card',
  component: StanfordEventCard,
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
type Story = StoryObj<typeof StanfordEventCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EventCard: Story = {
  render: ({start_date, end_date, headingLevel, ...args}) => {
    args.suEventDateTime = {
      value: Math.round(new Date(start_date).getTime() / 1000),
      end_value: Math.round(new Date(end_date).getTime() / 1000),
    }
    return <StanfordEventCard node={args} headingLevel={headingLevel}/>
  },
  args: {
    path: "/foo-bar",
    title: "title",
    body: {process: "body"},
    start_date: new Date().toUTCString(),
    end_date: new Date().toUTCString(),
    suEventType: [{id: "suEventType", name: "su_event_type"}],
    suEventAltLoc: "su_event_alt_loc",
    suEventSubheadline: "su_event_subheadline",
    suEventLocation: {
      address_line1: "address_line1",
      address_line2: "address_line2",
      administrative_area: "administrative_area",
      country_code: "country_code",
      locality: "locality",
      organization: "organization",
      postal_code: "postal_code",
      singleLine: "singleLine",
    }
  },
};
