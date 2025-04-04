import React, { useMemo } from 'react';
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
  /** Optional avatar element to display */
  avatar?: React.ReactNode;
  /** Optional content to show after the message */
  afterMessage?: React.ReactNode;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser = false,
  className = '',
  timestamp,
  extraContent,
  avatar,
  afterMessage
}) => {
  const { theme } = useTheme();

  const containerStyles = useMemo((): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center', // Changed from flex-start to center
    gap: theme.spacing.md,
    flexDirection: isUser ? 'row-reverse' : 'row',
    marginBottom: theme.spacing.sm,
  }), [theme, isUser]);

  const bubbleStyles = useMemo((): React.CSSProperties => ({
    backgroundColor: isUser ? theme.colors.userBubbleBackground : theme.colors.assistantBubbleBackground,
    color: isUser ? theme.colors.userBubbleText : theme.colors.assistantBubbleText,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    maxWidth: '80%',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.medium,
    wordWrap: 'break-word',
    position: 'relative',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease-in-out',
  }), [theme, isUser]);

  const metaContainerStyles = useMemo((): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.small,
    opacity: 0.7,
    color: isUser ? theme.colors.userBubbleText : theme.colors.assistantBubbleText,
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    transition: 'all 0.2s ease-in-out',
  }), [theme, isUser]);

  const messageStyles = useMemo((): React.CSSProperties => ({
    whiteSpace: 'pre-wrap',
    marginBottom: afterMessage ? theme.spacing.md : 0
  }), [theme, afterMessage]);

  return (
    <div className={`chat-bubble-container ${className}`.trim()} style={containerStyles}>
      {avatar && (
        <div className="chat-bubble-avatar" style={{ display: 'flex', alignItems: 'center' }}>
          {avatar}
        </div>
      )}
      <div className="chat-bubble" style={bubbleStyles}>
        <div style={messageStyles}>{message}</div>
        {afterMessage}
        {(timestamp || extraContent) && (
          <div style={metaContainerStyles}>
            {extraContent}
            {timestamp && <span>{timestamp}</span>}
          </div>
        )}
      </div>
    </div>
  );
};