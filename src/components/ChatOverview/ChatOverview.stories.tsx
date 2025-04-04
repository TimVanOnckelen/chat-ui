import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChatContainer, ChatMessage } from '../ChatContainer/ChatContainer';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatSelector } from '../ChatSelector/ChatSelector';
import { ModelSelector } from '../ModelSelector/ModelSelector';
import { ReasoningToggle } from '../ReasoningToggle/ReasoningToggle';
import { FileSelector } from '../FileSelector/FileSelector';
import { SelectedFile, SelectedFiles } from '../SelectedFiles/SelectedFiles';
import { AIProcessingIndicator } from '../AIProcessingIndicator/AIProcessingIndicator';
import { ChatSuggestions } from '../ChatSuggestions/ChatSuggestions';
import { useTheme } from '../../theme/ThemeProvider';

// Wrapper component for the interactive story
const ChatOverviewContent = () => {
  const { theme } = useTheme();
  // State management
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! Welcome to the Chat UI demo. I am an AI assistant ready to help you.',
      isUser: false,
      timestamp: '10:00 AM',
      extraContent: <span style={{ 
        backgroundColor: theme.colors.primary,
        color: theme.colors.userBubbleText,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.borderRadius.lg,
        fontSize: theme.typography.fontSize.small,
        fontWeight: 500
      }}>GPT-4</span>,
  
    }
  ]);
  const [selectedChat, setSelectedChat] = useState('1');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [reasoningEnabled, setReasoningEnabled] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sample data
  const chats = [
    {
      id: '1',
      title: 'Chat UI Demo',
      lastMessage: 'Welcome to the Chat UI demo!',
      timestamp: 'Just now'
    },
    {
      id: '2',
      title: 'Code Review',
      lastMessage: 'Let me analyze your React component...',
      timestamp: '2m ago',
      unreadCount: 2,
    },
    {
      id: '3',
      title: 'Bug Investigation',
      lastMessage: 'The issue appears to be in the authentication flow.',
      timestamp: '1h ago',
    },
    {
      id: '4',
      title: 'Feature Planning',
      lastMessage: 'Let\'s break down the requirements...',
      timestamp: '2h ago'
    }
  ];

  const models = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Most capable model, best for complex tasks'
    },
    {
      id: 'gpt-3.5',
      name: 'GPT-3.5',
      description: 'Faster responses, good for most tasks'
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      description: 'Alternative model with different capabilities'
    }
  ];

  // Handlers
  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 0.1, 0.9));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(1);
      setIsProcessing(false);

      let response = 'I understand you said: "' + message + '". ';
      if (selectedFiles.length > 0) {
        response += 'I see you\'ve attached ' + selectedFiles.length + ' file(s). ';
      }
      response += 'How else can I help you?';

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        extraContent: (
          <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
            <span style={{ 
              backgroundColor: theme.colors.primary,
              color: theme.colors.userBubbleText,
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              borderRadius: theme.borderRadius.lg,
              fontSize: theme.typography.fontSize.small,
              fontWeight: 500
            }}>{selectedModel.toUpperCase()}</span>
            {reasoningEnabled && (
              <span style={{ 
                color: theme.colors.text,
                opacity: 0.6,
                fontSize: theme.typography.fontSize.small
              }}>(Using reasoning mode)</span>
            )}
          </div>
        )
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const handleFileSelect = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div style={{ 
      width: '800px',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      boxSizing: 'border-box',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: theme.spacing.md, 
        alignItems: 'center',
        flexShrink: 0,
        overflow: 'auto',
        paddingBottom: theme.spacing.xs
      }}>
        <ChatSelector
          chats={chats}
          selectedChat={selectedChat}
          onChatSelect={setSelectedChat}
          onNewChat={() => {
            const newChat = {
              id: (chats.length + 1).toString(),
              title: 'New Chat',
              lastMessage: 'Starting a new conversation...',
              timestamp: 'Just now'
            };
            chats.unshift(newChat);
            setSelectedChat(newChat.id);
            setMessages([]);
          }}
        />
        <ModelSelector
          models={models}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        <ReasoningToggle
          enabled={reasoningEnabled}
          onToggle={setReasoningEnabled}
          text="Show Reasoning"
          icon={(
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
          )}
        />
      </div>

      <div style={{ 
        flex: 1,
        minHeight: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md
      }}>
        <ChatContainer
          messages={messages}
          maxHeight="100%"
        />
      </div>

      <ChatSuggestions
            suggestions={[
              {
                id: '1',
                text: 'Try another model',
                description: 'Switch to a different AI model to compare responses',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                )
              },
              {
                id: '2',
                text: 'Toggle reasoning',
                description: 'See the AI\'s thought process',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                )
              },
              {
                id: '3',
                text: 'Start new chat',
                description: 'Begin a fresh conversation',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                )
              }
            ]}
            onSelect={(suggestion) => {
              switch (suggestion.id) {
                case '1':
                  setSelectedModel(selectedModel === 'gpt-4' ? 'gpt-3.5' : 'gpt-4');
                  break;
                case '2':
                  setReasoningEnabled(!reasoningEnabled);
                  break;
                case '3':
                  const newChat = {
                    id: (chats.length + 1).toString(),
                    title: 'New Chat',
                    lastMessage: 'Starting a new conversation...',
                    timestamp: 'Just now'
                  };
                  chats.unshift(newChat);
                  setSelectedChat(newChat.id);
                  setMessages([]);
                  break;
              }
            }}
          />

      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.sm,
        flexShrink: 0
      }}>
        {selectedFiles.length > 0 && (
          <SelectedFiles
            files={selectedFiles}
            onRemoveFile={handleRemoveFile}
          />
        )}
        <ChatInput
          onSubmit={handleSendMessage}
          disabled={isProcessing}
          placeholder="Type a message..."
          afterInput={(
            <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
              <FileSelector
                onFilesSelected={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx"
                maxSize={5 * 1024 * 1024}
                disabled={isProcessing}
              />
              {isProcessing && (
                <AIProcessingIndicator
                  showProgress
                  progress={progress}
                  text="AI is thinking"
                />
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

const ChatOverview = () => (
  <ChatOverviewContent />
);


const meta = {
  title: 'Getting Started/Chat UI Overview',
  component: ChatOverview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Chat UI Component Integration

This story demonstrates a fully functional chat interface that combines all core components into a cohesive experience.

## Component Architecture

### Navigation & Control Layer
- \`ChatSelector\`: Manages multiple conversations and allows switching between them
  - Integrates with chat history
  - Supports creating new conversations
- \`ModelSelector\`: Controls AI model selection
  - Displays model capabilities and descriptions
  - Affects AI response behavior
- \`ReasoningToggle\`: Toggles display of AI reasoning steps
  - Enhances transparency of AI decision making

### Message Interface
- \`ChatContainer\`: Core message display area
  - Auto-scrolling message container
  - Handles both user and AI messages
  - Supports rich content in messages
- \`ChatBubble\`: Individual message styling
  - Different styles for user/AI messages
  - Supports timestamps and extra content
- \`ChatInput\`: User interaction area
  - Multi-line text input
  - Integrated file attachment
  - Disabled state during AI processing

### File Handling System
- \`FileSelector\`: File upload interface
  - Type restrictions (images, documents)
  - Size validation (5MB limit)
  - Multiple file support
- \`SelectedFiles\`: File management
  - Visual file preview
  - Size display
  - Remove functionality

### Processing Feedback
- \`AIProcessingIndicator\`: Visual feedback
  - Progress bar for AI response
  - Custom loading messages
  - Integrated with input disabled state

### Suggestions System
- \`ChatSuggestions\`: Provides actionable suggestions
  - Contextual suggestions based on conversation
  - Interactive selection to trigger actions

## State Management
The components share state for:
- Active conversation
- Selected AI model
- Uploaded files
- Processing status
- Message history

## Theme Integration
All components use the \`ThemeProvider\` for consistent styling and can be themed together.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
