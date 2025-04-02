import React, { useMemo } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface ReasoningBubbleProps {
  /** The reasoning/explanation text to display */
  text: string;
  /** Optional className for styling */
  className?: string;
  /** Optional label to show before the reasoning text */
  label?: string;
  /** Optional icon to show next to the label */
  icon?: React.ReactNode;
}

export const ReasoningBubble: React.FC<ReasoningBubbleProps> = ({
  text,
  className = '',
  label = 'Reasoning',
  icon
}) => {
  const { theme } = useTheme();

  const containerStyles = useMemo((): React.CSSProperties => ({
    backgroundColor: `${theme.colors.secondary}15`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.secondary}30`,
    fontFamily: theme.typography.fontFamily,
  }), [theme]);

  const labelContainerStyles = useMemo((): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
    color: theme.colors.secondary,
    fontWeight: 500,
    fontFamily: theme.typography.fontFamily,
  }), [theme]);

  const textStyles = useMemo((): React.CSSProperties => ({
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5',
  }), []);

  return (
    <div className={`reasoning-bubble ${className}`.trim()} style={containerStyles}>
      <div style={labelContainerStyles}>
        {icon && <span style={{ fontSize: '14px' }}>{icon}</span>}
        <span>{label}</span>
      </div>
      <div style={textStyles}>{text}</div>
    </div>
  );
};