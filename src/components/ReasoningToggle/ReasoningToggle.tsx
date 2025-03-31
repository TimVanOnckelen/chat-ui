import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface ReasoningToggleProps {
  /** Whether reasoning mode is enabled */
  enabled: boolean;
  /** Callback when toggle state changes */
  onToggle: (enabled: boolean) => void;
  /** Optional className for styling */
  className?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
}

export const ReasoningToggle: React.FC<ReasoningToggleProps> = ({
  enabled,
  onToggle,
  className = '',
  disabled = false,
}) => {
  const theme = useTheme();

  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.theme.spacing.sm,
    padding: `${theme.theme.spacing.sm} ${theme.theme.spacing.md}`,
    backgroundColor: enabled ? theme.theme.colors.primary : 'transparent',
    color: enabled ? '#ffffff' : theme.theme.colors.text,
    border: `1px solid ${enabled ? theme.theme.colors.primary : `${theme.theme.colors.text}20`}`,
    borderRadius: theme.theme.borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    fontFamily: theme.theme.typography.fontFamily,
    fontSize: theme.theme.typography.fontSize.small,
    fontWeight: 500,
  };

  const handleClick = () => {
    if (!disabled) {
      onToggle(!enabled);
    }
  };

  return (
    <button 
      className={`reasoning-toggle ${className}`}
      style={buttonStyles}
      onClick={handleClick}
      disabled={disabled}
      type="button"
      role="switch"
      aria-pressed={enabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = enabled 
            ? `${theme.theme.colors.primary}90`
            : `${theme.theme.colors.text}10`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = enabled 
            ? theme.theme.colors.primary
            : 'transparent';
        }
      }}
    >
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
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 2a10 10 0 1 1-10 10h10V2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      Reasoning
    </button>
  );
};