import type { Meta, StoryObj } from '@storybook/react';
import { ChatSuggestions } from './ChatSuggestions';

const meta = {
  title: 'Chat/ChatSuggestions',
  component: ChatSuggestions,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ChatSuggestions>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSuggestions = [
  {
    id: '1',
    text: 'Explain the code above',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    id: '2',
    text: 'What are the key differences between these implementations?',
    description: 'Compare and analyze the code snippets',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3H7a2 2 0 0 0-2 2v5"></path>
        <path d="M21 8V7a2 2 0 0 0-2-2h-5"></path>
        <path d="M3 16v1a2 2 0 0 0 2 2h5"></path>
        <path d="M16 21h1a2 2 0 0 0 2-2v-5"></path>
      </svg>
    ),
  },
  {
    id: '3',
    text: 'Generate unit tests',
    description: 'Create comprehensive test cases for the component',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    ),
  },
];

export const Default: Story = {
  args: {
    suggestions: defaultSuggestions,
    onSelect: (suggestion) => console.log('Selected suggestion:', suggestion),
  },
};

export const WithoutIcons: Story = {
  args: {
    suggestions: defaultSuggestions.map(({ id, text, description }) => ({
      id,
      text,
      description,
    })),
    onSelect: (suggestion) => console.log('Selected suggestion:', suggestion),
  },
};

export const WithoutDescriptions: Story = {
  args: {
    suggestions: defaultSuggestions.map(({ id, text, icon }) => ({
      id,
      text,
      icon,
    })),
    onSelect: (suggestion) => console.log('Selected suggestion:', suggestion),
  },
};

export const WithCustomTitle: Story = {
  args: {
    suggestions: defaultSuggestions,
    onSelect: (suggestion) => console.log('Selected suggestion:', suggestion),
    title: 'What would you like me to do?',
  },
};

// Example showing how suggestions can change based on context
const contextualSuggestions = [
  {
    id: '1',
    text: 'Fix the TypeScript error',
    description: 'Resolve the type mismatch in the function parameters',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    ),
  },
  {
    id: '2',
    text: 'Show me similar examples',
    description: 'Find related code patterns in the codebase',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
  },
  {
    id: '3',
    text: 'Optimize the code',
    description: 'Suggest performance improvements',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
  },
];

export const ContextualSuggestions: Story = {
  args: {
    suggestions: contextualSuggestions,
    onSelect: (suggestion) => console.log('Selected suggestion:', suggestion),
    title: 'I found some issues. Would you like me to:',
  },
};