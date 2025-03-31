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
    minHeight: '100%',
    position: 'relative',
  };

  const emptyStateStyles: React.CSSProperties = messages.length === 0 ? {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: `2px dashed ${theme.colors.text}20`,
  } : {};

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
      {messages.length === 0 && <div style={emptyStateStyles} aria-hidden="true" />}
    </div>
  );
};