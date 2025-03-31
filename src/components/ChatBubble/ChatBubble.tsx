import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface ChatBubbleProps {
  /** The content of the message */
  message: string;
  /** Whether the message is from the user (true) or assistant (false) */
  isUser?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Optional timestamp to show when the message was sent */
  timestamp?: string;
  /** Optional extra content to show next to the timestamp */
  extraContent?: React.ReactNode;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser = false,
  className = '',
  timestamp,
  extraContent
}) => {
  const { theme } = useTheme();

  const bubbleStyles: React.CSSProperties = {
    backgroundColor: isUser ? theme.colors.userBubbleBackground : theme.colors.assistantBubbleBackground,
    color: isUser ? theme.colors.userBubbleText : theme.colors.assistantBubbleText,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    maxWidth: '80%',
    marginLeft: isUser ? 'auto' : theme.spacing.md,
    marginRight: isUser ? theme.spacing.md : 'auto',
    marginBottom: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.medium,
    wordWrap: 'break-word',
    position: 'relative',
  };

  const metaContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.small,
    color: isUser ? `${theme.colors.userBubbleText}99` : `${theme.colors.assistantBubbleText}99`,
    justifyContent: isUser ? 'flex-end' : 'flex-start',
  };

  return (
    <div className={`chat-bubble ${className}`} style={bubbleStyles}>
      {message}
      {(timestamp || extraContent) && (
        <div style={metaContainerStyles}>
          {extraContent}
          {timestamp}
        </div>
      )}
    </div>
  );
};