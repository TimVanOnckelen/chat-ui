import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface ChatSuggestion {
  id: string;
  text: string;
  /** Optional icon to show before the text */
  icon?: React.ReactNode;
  /** Optional description or preview */
  description?: string;
}

export interface ChatSuggestionsProps {
  /** Array of suggestions to display */
  suggestions: ChatSuggestion[];
  /** Callback when a suggestion is selected */
  onSelect: (suggestion: ChatSuggestion) => void;
  /** Optional className for styling */
  className?: string;
  /** Optional title above the suggestions */
  title?: string;
}

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({
  suggestions,
  onSelect,
  className = '',
  title = 'Suggestions',
}) => {
  const { theme } = useTheme();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    width: '100%',
    fontFamily: theme.typography.fontFamily,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.small,
    color: `${theme.colors.text}99`,
    fontWeight: 500,
    marginBottom: theme.spacing.xs,
  };

  const suggestionsContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  };

  const suggestionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.text}20`,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.small,
    maxWidth: '300px',
    flex: '1 1 200px',
  };

  const iconStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.primary,
  };

  const textContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.small,
    color: `${theme.colors.text}80`,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  return (
    <div className={`chat-suggestions ${className}`.trim()} style={containerStyles}>
      {title && <div style={titleStyles}>{title}</div>}
      <div style={suggestionsContainerStyles}>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion)}
            style={suggestionStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.colors.text}05`;
              e.currentTarget.style.borderColor = `${theme.colors.primary}40`;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.background;
              e.currentTarget.style.borderColor = `${theme.colors.text}20`;
              e.currentTarget.style.transform = 'none';
            }}
          >
            {suggestion.icon && (
              <span style={iconStyles}>{suggestion.icon}</span>
            )}
            <div style={textContainerStyles}>
              <span>{suggestion.text}</span>
              {suggestion.description && (
                <span style={descriptionStyles}>{suggestion.description}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};