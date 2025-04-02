import type { Meta, StoryObj } from '@storybook/react';
import { ChatContainer } from './ChatContainer';
import { AIProcessingIndicator } from '../AIProcessingIndicator/AIProcessingIndicator';

// AI Badge component for demo purposes
const AIBadge = () => (
  <span style={{ 
    backgroundColor: '#10B981',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 500
  }}>
    GPT-4
  </span>
);

const meta = {
  title: 'Chat/ChatContainer',
  component: ChatContainer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
        <div style={{ width: '600px', margin: '0 auto' }}>
          <Story />
        </div>
    ),
  ],
} satisfies Meta<typeof ChatContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  args: {
    messages: [],
    maxHeight: '400px',
  },
};

export const EmptyStateFullHeight: Story = {
  args: {
    messages: [],
    maxHeight: '600px',
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '600px', margin: '0 auto', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

const sampleMessages = [
  {
    id: '1',
    message: 'Hello! How can I help you today?',
    isUser: false,
    timestamp: '12:30 PM',
    extraContent: <AIBadge />
  },
  {
    id: '2',
    message: 'I need help with a coding problem.',
    isUser: true,
    timestamp: '12:31 PM'
  },
  {
    id: '3',
    message: 'I\'ll be happy to help. Could you describe the problem you\'re facing?',
    isUser: false,
    timestamp: '12:31 PM',
    extraContent: <AIBadge />
  },
  {
    id: '4',
    message: 'I\'m trying to implement a React component that...',
    isUser: true,
    timestamp: '12:32 PM'
  },
  {
    id: '5',
    message: 'Let me analyze your requirements...',
    isUser: false,
    extraContent: <AIProcessingIndicator showProgress progress={0.6} />
  }
];

export const Default: Story = {
  args: {
    messages: sampleMessages,
  },
};

export const LongConversation: Story = {
  args: {
    messages: [
      ...sampleMessages,
      ...sampleMessages.map(msg => ({
        ...msg,
        id: `${msg.id}-duplicate`
      }))
    ],
    maxHeight: '400px',
  },
};

export const WithoutTimestamps: Story = {
  args: {
    messages: sampleMessages.map(({ ...msg }) => msg),
  },
};