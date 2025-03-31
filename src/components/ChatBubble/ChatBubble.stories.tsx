import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';
import { ThemeProvider } from '../../theme/ThemeProvider';

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

// Processing indicator for demo purposes
const ProcessingIndicator = () => (
  <span style={{ 
    color: '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }}>
    <span style={{ fontSize: '10px' }}>●</span> Processing
  </span>
);

const meta = {
  title: 'Chat/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    message: 'Hello! How can I help you today?',
    isUser: true,
    timestamp: '12:30 PM',
  },
};

export const AssistantMessage: Story = {
  args: {
    message: 'I\'m doing great! How can I assist you today?',
    isUser: false,
    timestamp: '12:31 PM',
    extraContent: <AIBadge />
  },
};

export const AssistantProcessing: Story = {
  args: {
    message: 'Let me think about that...',
    isUser: false,
    extraContent: <ProcessingIndicator />
  },
};

export const LongMessage: Story = {
  args: {
    message: 'This is a very long message that should wrap properly within the chat bubble. It demonstrates how the component handles multiple lines of text and maintains proper spacing and alignment.',
    isUser: true,
    timestamp: '12:32 PM',
  },
};

export const WithoutTimestamp: Story = {
  args: {
    message: 'A simple message without a timestamp',
    isUser: false,
    extraContent: <AIBadge />
  },
};