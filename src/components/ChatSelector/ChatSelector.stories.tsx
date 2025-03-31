import type { Meta, StoryObj } from '@storybook/react';
import { ChatSelector } from './ChatSelector';

const meta = {
  title: 'Chat/ChatSelector',
  component: ChatSelector,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '200px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleChats = [
  {
    id: '1',
    title: 'Code Review Help',
    lastMessage: 'Could you review this React component?',
    timestamp: '2m ago',
    unreadCount: 2,
  },
  {
    id: '2',
    title: 'Bug Investigation',
    lastMessage: 'The issue seems to be in the authentication flow...',
    timestamp: '1h ago',
  },
  {
    id: '3',
    title: 'Project Planning',
    lastMessage: 'Let\'s break down the requirements...',
    timestamp: 'Yesterday',
  },
  {
    id: '4',
    title: 'API Design Discussion',
    lastMessage: 'RESTful or GraphQL?',
    timestamp: '2d ago',
  },
];

export const Default: Story = {
  args: {
    chats: sampleChats,
    selectedChat: '1',
    onChatSelect: (chatId) => console.log('Chat selected:', chatId),
    onNewChat: () => console.log('New chat requested'),
  },
};

export const WithoutNewChat: Story = {
  args: {
    chats: sampleChats,
    selectedChat: '2',
    onChatSelect: (chatId) => console.log('Chat selected:', chatId),
  },
};

export const NoUnreadCounts: Story = {
  args: {
    chats: sampleChats.map(({ unreadCount, ...chat }) => chat),
    selectedChat: '3',
    onChatSelect: (chatId) => console.log('Chat selected:', chatId),
    onNewChat: () => console.log('New chat requested'),
  },
};

export const EmptyList: Story = {
  args: {
    chats: [],
    selectedChat: '',
    onChatSelect: (chatId) => console.log('Chat selected:', chatId),
    onNewChat: () => console.log('New chat requested'),
  },
};

export const Disabled: Story = {
  args: {
    chats: sampleChats,
    selectedChat: '1',
    onChatSelect: (chatId) => console.log('Chat selected:', chatId),
    onNewChat: () => console.log('New chat requested'),
    disabled: true,
  },
};