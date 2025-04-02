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
import { ThemeProvider } from '../../theme/ThemeProvider';

// Wrapper component for the interactive story
const ChatOverview = () => {
  // State management
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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
      title: 'New Chat',
      timestamp: 'Just now'
    },
    {
      id: '2',
      title: 'Code Review Help',
      lastMessage: 'Could you review this React component?',
      timestamp: '2m ago',
      unreadCount: 2,
    },
    {
      id: '3',
      title: 'Bug Investigation',
      lastMessage: 'The issue seems to be in the authentication flow...',
      timestamp: '1h ago',
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
      description: 'Faster response times, good for most tasks'
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
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(1);
      setIsProcessing(false);
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: 'This is a simulated AI response to demonstrate the interface.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        extraContent: reasoningEnabled ? '(Reasoning: This is a demonstration of the reasoning feature)' : undefined
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 3000);
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
    <ThemeProvider initialTheme="default">
      <div style={{ 
        width: '800px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        overflow: 'hidden', // Add overflow hidden to prevent overflow
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', minWidth: 0 }}>
          <ChatSelector
            chats={chats}
            selectedChat={selectedChat}
            onChatSelect={setSelectedChat}
            onNewChat={() => {
              const newChat = {
                id: (chats.length + 1).toString(),
                title: 'New Chat',
                timestamp: 'Just now'
              };
              chats.unshift(newChat);
              setSelectedChat(newChat.id);
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
          />
        </div>

        <div style={{ 
          flex: 1, 
          minHeight: 0,
          minWidth: 0, // Add minWidth to prevent flex items from overflowing
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative', // Add position relative for proper sizing
          width: '100%', // Ensure full width
        }}>
          <ChatContainer
            messages={messages}
            maxHeight="100%"
          />
        </div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: 'auto',
          minWidth: 0, // Add minWidth to prevent flex items from overflowing
          width: '100%', // Ensure full width
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
            afterInput={(
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
    </ThemeProvider>
  );
};

const meta = {
  title: 'Getting Started/Chat UI Overview',
  component: ChatOverview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A complete chat interface that demonstrates the integration of all core components:

- **Chat Interface**
  - ChatContainer: Scrollable message container with auto-scroll
  - ChatInput: Multi-line input with file attachment support
  - ChatBubbles: Message bubbles for both user and AI
  
- **Controls & State**
  - ChatSelector: Switch between different conversations
  - ModelSelector: Choose AI models with descriptions
  - ReasoningToggle: Toggle AI reasoning display
  
- **File Handling**
  - FileSelector: Upload files with size/type validation
  - SelectedFiles: Preview and manage uploaded files
  
- **Feedback**
  - AIProcessingIndicator: Show AI thinking state
  - Progress tracking for responses
  
All components are fully themeable through the ThemeProvider.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};