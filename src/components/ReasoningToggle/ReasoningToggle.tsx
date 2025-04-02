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

  text?: string,
  icon?: React.ReactNode,
  iconPosition?: 'left' | 'right',
  iconSize?: number,
}

export const ReasoningToggle: React.FC<ReasoningToggleProps> = ({
  enabled,
  onToggle,
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
  iconSize = 14,
  text = 'Reasoning',
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
    height: theme.theme.spacing.xl
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
      {icon && iconPosition === 'left' && (
        <span style={{ marginRight: theme.theme.spacing.sm, fontSize: iconSize }}>
          {icon}
        </span> 
      )}
      {text}
      {icon && iconPosition === 'right' && (
        <span style={{ marginLeft: theme.theme.spacing.sm, fontSize: iconSize }}>
          {icon}
        </span> 
      )}
    </button>
  );
};