import { Shush } from "../index";

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Shush>  = {
  title: "Shush",
  component: Shush,
  tags: ['autodocs'],
  argTypes: {
    config: { expanded: true },
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Widget: Story = {
  args: {
    config: {
      integratorId: "awesome-dapp"
    },
  }
}
