import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';
import { ContextList } from '../ContextList/ContextList';
import { AvatarHolder } from '../AvatarHolder/AvatarHolder';

const meta = {
  title: 'Chat/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Hello, how can I help you today?',
    isUser: false,
  },
};

export const UserMessage: Story = {
  args: {
    message: 'I have a question about React hooks.',
    isUser: true,
  },
};

export const WithTimestamp: Story = {
  args: {
    message: 'This message has a timestamp.',
    timestamp: '12:34 PM',
    isUser: false,
  },
};

export const WithUserAvatar: Story = {
  args: {
    message: 'Here is a message with a user avatar.',
    isUser: true,
    timestamp: '12:34 PM',
    avatar: <AvatarHolder text="Tim van Osch" size={40} backgroundColor="#6366f1" textColor="#ffffff" />,
  },
};

export const WithAssistantAvatar: Story = {
  args: {
    message: 'Here is a message with an assistant avatar.',
    isUser: false,
    timestamp: '12:35 PM',
    avatar: <AvatarHolder image="https://github.com/github.png" size={40} />,
  },
};

export const Conversation = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <ChatBubble 
      message="Hello! How can I assist you today?"
      isUser={false}
      timestamp="12:30 PM"
      avatar={<AvatarHolder image="https://github.com/github.png" size={40} />}
    />
    <ChatBubble 
      message="I need help with React components."
      isUser={true}
      timestamp="12:31 PM"
      avatar={<AvatarHolder text="Tim van Osch" size={40} backgroundColor="#6366f1" textColor="#ffffff" />}
    />
    <ChatBubble 
      message="I'd be happy to help you with React components. What specific aspect would you like to learn about?"
      isUser={false}
      timestamp="12:32 PM"
      avatar={<AvatarHolder image="https://github.com/github.png" size={40} />}
    />
  </div>
);

const contextItems = [
  {
    title: 'React Hooks Documentation',
    content: 'Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.',
    confidence: 0.95,
    source: 'React official docs'
  },
  {
    title: 'useState API Reference',
    content: 'const [state, setState] = useState(initialState) - Returns a stateful value, and a function to update it.',
    confidence: 0.89,
    source: 'React Hooks API'
  },
  {
    title: 'Custom Hooks Guide',
    content: 'Custom Hooks are JavaScript functions whose names start with "use" and that may call other Hooks.',
    confidence: 0.82,
    source: 'React Advanced Guides'
  },
  {
    title: 'Rules of Hooks',
    content: 'Only call Hooks at the top level. Don\'t call Hooks inside loops, conditions, or nested functions.',
    confidence: 0.78,
    source: 'React Hooks Rules'
  }
];

export const WithContextList: Story = {
  args: {
    message: 'Here\'s what I found about React Hooks in the documentation:',
    isUser: false,
    timestamp: '12:34 PM',
    avatar: <AvatarHolder image="https://github.com/github.png" size={40} />,
    extraContent: <span style={{ 
      backgroundColor: '#10B981',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 500
    }}>GPT-4</span>,
    afterMessage: (
      <ContextList
        items={contextItems}
        icon={
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
            <path d="M21 10h-4a2 2 0 0 1-2-2V4" />
            <path d="M21 14v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1-2-2h4" />
            <line x1="14" y1="4" x2="14" y2="10" />
            <line x1="10" y1="7" x2="18" y2="7" />
          </svg>
        }
        maxItems={3}
        defaultCollapsed={false}
      />
    )
  },
};