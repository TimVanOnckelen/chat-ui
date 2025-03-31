import type { Meta, StoryObj } from '@storybook/react';
import { ReasoningToggle } from './ReasoningToggle';

const meta = {
  title: 'Chat/ReasoningToggle',
  component: ReasoningToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReasoningToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: {
    enabled: false,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const Active: Story = {
  args: {
    enabled: true,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const Locked: Story = {
  args: {
    enabled: false,
    disabled: true,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const ActiveLocked: Story = {
  args: {
    enabled: true,
    disabled: true,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};