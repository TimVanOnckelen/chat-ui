import React, { useMemo } from 'react';
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
  const { theme, currentThemeType } = useTheme();
  const [message, setMessage] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const containerStyles = useMemo((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100%',
    };

    switch (currentThemeType) {
      case 'forest':
        return {
          ...baseStyles,
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          backgroundColor: theme.colors.background,
          borderTop: `1px solid ${theme.colors.text}15`,
          maxWidth: '48rem',
          margin: '0 auto',
        };
      case 'apple':
        return {
          ...baseStyles,
          padding: theme.spacing.md,
          backgroundColor: 'transparent',
        };
      case 'fluent':
        return {
          ...baseStyles,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        };
      default:
        return {
          ...baseStyles,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background,
          borderRadius: theme.borderRadius.md,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        };
    }
  }, [theme, currentThemeType]);

  const inputContainerStyles = useMemo((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-end',
      gap: theme.spacing.sm,
      width: '100%',
    };

    switch (currentThemeType) {
      case 'forest':
        return {
          ...baseStyles,
          border: `1px solid ${isFocused ? theme.colors.primary : theme.colors.text}20`,
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.colors.background,
          boxShadow: isFocused ? `0 0 0 1px ${theme.colors.primary}40` : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        };
      case 'apple':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.text + '10',
          borderRadius: '24px',
          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        };
      case 'fluent':
        return {
          ...baseStyles,
          border: `2px solid ${isFocused ? theme.colors.primary : 'transparent'}`,
          borderRadius: theme.borderRadius.sm,
          backgroundColor: theme.colors.text + '05',
          transition: 'border-color 0.2s',
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: theme.colors.text + '10',
        };
    }
  }, [theme, currentThemeType, isFocused]);

  const textareaStyles = useMemo((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: '100%',
      border: 'none',
      outline: 'none',
      resize: 'none',
      minHeight: '24px',
      maxHeight: '200px',
      backgroundColor: 'transparent',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize.medium,
      lineHeight: '1.5',
      color: theme.colors.text,
    };

    switch (currentThemeType) {
      case 'forest':
        return {
          ...baseStyles,
          padding: '12px 16px',
          marginRight: '48px',
        };
      case 'apple':
        return {
          ...baseStyles,
          padding: '8px 12px',
          marginRight: '40px',
        };
      case 'fluent':
        return {
          ...baseStyles,
          padding: '8px 12px',
        };
      default:
        return {
          ...baseStyles,
          padding: theme.spacing.sm,
        };
    }
  }, [theme, currentThemeType]);

  const sendButtonStyles = useMemo((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: disabled || !message.trim() ? 'not-allowed' : 'pointer',
      opacity: disabled || !message.trim() ? 0.6 : 1,
      transition: 'all 0.2s ease',
      padding: 0,
      backgroundColor: 'transparent',
    };

    switch (currentThemeType) {
      case 'forest':
        return {
          ...baseStyles,
          position: 'absolute',
          right: '12px',
          bottom: '8px',
          width: '32px',
          height: '32px',
          color: message.trim() ? theme.colors.primary : theme.colors.text + '40',
        };
      case 'apple':
        return {
          ...baseStyles,
          width: '32px',
          height: '32px',
          backgroundColor: message.trim() ? theme.colors.primary : theme.colors.text + '20',
          borderRadius: '50%',
          color: message.trim() ? '#fff' : theme.colors.text + '40',
          marginRight: '4px',
          transform: message.trim() ? 'scale(1)' : 'scale(0.8)',
        };
      case 'fluent':
        return {
          ...baseStyles,
          width: '32px',
          height: '32px',
          color: message.trim() ? theme.colors.primary : theme.colors.text + '40',
          marginRight: '4px',
        };
      default:
        return {
          ...baseStyles,
          width: '40px',
          height: '40px',
          backgroundColor: theme.colors.primary,
          color: '#fff',
          borderRadius: theme.borderRadius.sm,
        };
    }
  }, [theme, currentThemeType, message, disabled]);

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
      <div style={inputContainerStyles}>
        {beforeInput}
        <div style={{ position: 'relative', flex: 1 }}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            style={textareaStyles}
            rows={1}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          style={sendButtonStyles}
          disabled={disabled || !message.trim()}
          aria-label="Send message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={currentThemeType === 'apple' ? 'currentColor' : 'none'}
            stroke={currentThemeType === 'apple' ? 'none' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
        {afterInput}
      </div>
    </div>
  );
};