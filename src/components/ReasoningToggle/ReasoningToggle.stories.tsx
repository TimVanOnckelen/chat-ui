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

const BookIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const BrainIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
    <path d="M12 2a10 10 0 1 1-10 10h10V2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Default: Story = {
  args: {
    enabled: false,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const Enabled: Story = {
  args: {
    enabled: true,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const WithCustomText: Story = {
  args: {
    enabled: false,
    text: 'Show Explanation',
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const WithCustomIcon: Story = {
  args: {
    enabled: false,
    text: 'Show Reasoning',
    icon: BookIcon,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const IconRight: Story = {
  args: {
    enabled: false,
    text: 'Enable Reasoning',
    icon: BrainIcon,
    iconPosition: 'right',
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const LargeIcon: Story = {
  args: {
    enabled: false,
    text: 'Reasoning',
    icon: BookIcon,
    iconSize: 18,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const Disabled: Story = {
  args: {
    enabled: false,
    disabled: true,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};

export const DisabledEnabled: Story = {
  args: {
    enabled: true,
    disabled: true,
    onToggle: (enabled) => console.log('Reasoning toggled:', enabled),
  },
};