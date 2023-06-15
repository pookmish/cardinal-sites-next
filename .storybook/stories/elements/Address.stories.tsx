import type { Meta, StoryObj } from '@storybook/react';
import Address from "@components/elements/address";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Address> = {
  title: 'Design/Elements/Address',
  component: Address,
  tags: ['autodocs'],
  argTypes: {

  }
};

export default meta;
type Story = StoryObj<typeof Address>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AddressElement: Story = {
  args: {
    address_line1: "address_line1",
    address_line2: "address_line2",
    administrative_area: "administrative_area",
    country_code: "country_code",
    locality: "locality",
    organization: "organization",
    postal_code: "postal_code",
    singleLine: false,
  },
};

export const OnelineAddress: Story = {
  args: {
    ...AddressElement.args,
    singleLine: true,
  }
}