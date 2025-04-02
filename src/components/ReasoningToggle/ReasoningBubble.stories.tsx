import type { Meta, StoryObj } from '@storybook/react';
import { ReasoningBubble } from './ReasoningBubble';

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

const meta = {
  title: 'Chat/ReasoningBubble',
  component: ReasoningBubble,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReasoningBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'I chose this approach because it provides better performance and maintainability. The algorithm has O(n) complexity and uses minimal memory.',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'This solution leverages React hooks for state management, providing a more elegant and maintainable approach compared to class components.',
    icon: BrainIcon,
  },
};

export const CustomLabel: Story = {
  args: {
    text: 'The authentication flow uses JWT tokens with refresh token rotation for enhanced security.',
    label: 'Explanation',
    icon: BookIcon,
  },
};

export const LongText: Story = {
  args: {
    text: `Let me break down my reasoning for this architectural decision:

1. Scalability: The microservices architecture allows each component to scale independently based on demand.

2. Maintainability: Each service has a single responsibility, making the codebase easier to understand and maintain.

3. Technology Flexibility: Different services can use different technologies based on their specific requirements.

4. Fault Isolation: Issues in one service don't directly affect others, improving system resilience.`,
    label: 'Architecture Decision',
    icon: BrainIcon,
  },
};