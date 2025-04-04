import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { ChatBubble } from '../ChatBubble/ChatBubble';

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp?: string;
  extraContent?: React.ReactNode;
  avatar?: React.ReactNode;
  /** Optional content to show after the message bubble */
  afterMessage?: React.ReactNode;
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
  noMessages?: React.ReactNode;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  className = '',
  maxHeight = '600px',
  autoScroll = true,
  noMessages = null,
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
    minHeight: '100%',
    position: 'relative',
    scrollbarColor: `${theme.colors.text}20 ${theme.colors.background}`,
    scrollbarWidth: 'thin',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.medium
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
        <React.Fragment key={message.id}>
          <ChatBubble
            message={message.message}
            isUser={message.isUser}
            timestamp={message.timestamp}
            extraContent={message.extraContent}
            avatar={message.avatar}
          />
          {message.afterMessage}
        </React.Fragment>
      ))}
      {messages.length === 0 && noMessages ? <>{noMessages}</> : <div style={emptyStateStyles} aria-hidden="true" />}
      
    </div>
  );
};