import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface ChatInputProps {
  /** Callback when message is submitted */
  onSubmit: (message: string) => void;
  /** Optional placeholder text */
  placeholder?: string;
  /** Optional className for styling */
  className?: string;
  /** Optional extra content to show before the input */
  beforeInput?: React.ReactNode;
  /** Optional extra content to show after the input */
  afterInput?: React.ReactNode;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to auto focus the input */
  autoFocus?: boolean;
  /** Whether to clear the input after submit */
  clearOnSubmit?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  placeholder = 'Type a message...',
  className = '',
  beforeInput,
  afterInput,
  disabled = false,
  autoFocus = false,
  clearOnSubmit = true,
}) => {
  const theme = useTheme();
  const [message, setMessage] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.theme.spacing.sm,
    padding: theme.theme.spacing.md,
    backgroundColor: theme.theme.colors.background,
    borderRadius: theme.theme.borderRadius.md,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '100%',
  };

  const textareaStyles: React.CSSProperties = {
    width: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
    minHeight: '44px',
    maxHeight: '200px',
    padding: theme.theme.spacing.sm,
    backgroundColor: `${theme.theme.colors.text}10`,
    borderRadius: theme.theme.borderRadius.sm,
    fontFamily: theme.theme.typography.fontFamily,
    fontSize: theme.theme.typography.fontSize.medium,
    lineHeight: '1.5',
    color: theme.theme.colors.text,
  };

  const bottomRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.theme.spacing.sm,
    justifyContent: 'space-between',
  };

  const leftSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.theme.spacing.sm,
    flex: 1,
  };

  const sendButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.theme.spacing.sm,
    backgroundColor: theme.theme.colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: theme.theme.borderRadius.sm,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled || !message.trim() ? 0.6 : 1,
    transition: 'opacity 0.2s, background-color 0.2s',
    minWidth: '40px',
    height: '40px',
    marginLeft: 'auto',
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSubmit(trimmedMessage);
      if (clearOnSubmit) {
        setMessage('');
      }
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className={`chat-input ${className}`} style={containerStyles}>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        style={textareaStyles}
      />
      <div style={bottomRowStyles}>
        <div style={leftSectionStyles}>
          {beforeInput}
          {afterInput}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          style={sendButtonStyles}
          disabled={disabled || !message.trim()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};