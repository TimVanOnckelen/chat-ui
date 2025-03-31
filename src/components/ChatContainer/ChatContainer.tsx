import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { ChatBubble } from '../ChatBubble/ChatBubble';

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp?: string;
  extraContent?: React.ReactNode;
}

export interface ChatContainerProps {
  /** Array of messages to display */
  messages: ChatMessage[];
  /** Optional className for additional styling */
  className?: string;
  /** Maximum height of the container. Default is 600px */
  maxHeight?: string;
  /** Whether to auto scroll to bottom on new messages */
  autoScroll?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  className = '',
  maxHeight = '600px',
  autoScroll = true
}) => {
  const { theme } = useTheme();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, autoScroll]);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    maxHeight,
    overflowY: 'auto',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
  };

  return (
    <div 
      ref={containerRef}
      className={`chat-container ${className}`}
      style={containerStyles}
    >
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message.message}
          isUser={message.isUser}
          timestamp={message.timestamp}
          extraContent={message.extraContent}
        />
      ))}
    </div>
  );
};