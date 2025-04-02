import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface ContextItem {
  title: string;
  content: string;
  confidence?: number;
  source?: string;
}

export interface ContextListProps {
  /** Array of context items to display */
  items: ContextItem[];
  /** Optional className for styling */
  className?: string;
  /** Optional icon to show next to the title */
  icon?: React.ReactNode;
  /** Maximum number of items to show */
  maxItems?: number;
  /** Whether the list starts collapsed */
  defaultCollapsed?: boolean;
}

export const ContextList: React.FC<ContextListProps> = ({
  items,
  className = '',
  icon,
  maxItems = 3,
  defaultCollapsed = false
}) => {
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor: `${theme.colors.text}05`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.assistantBubbleText,
    fontFamily: theme.typography.fontFamily,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    color: `${theme.colors.text}99`,
    cursor: 'pointer',
    userSelect: 'none',
  };

  const itemStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.text}10`,
  };

  const titleStyles: React.CSSProperties = {
    fontWeight: 500,
    color: theme.colors.text,
  };

  const contentStyles: React.CSSProperties = {
    color: `${theme.colors.text}99`,
    lineHeight: '1.5',
  };

  const sourceStyles: React.CSSProperties = {
    color: `${theme.colors.text}60`,
    fontSize: '11px',
    marginTop: theme.spacing.xs,
  };

  const confidenceStyles: React.CSSProperties = {
    display: 'inline-block',
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    backgroundColor: theme.colors.primary,
    color: theme.colors.userBubbleText,
    borderRadius: '12px',
    fontSize: '11px',
    marginLeft: 'auto',
  };

  const toggleIconStyles: React.CSSProperties = {
    marginLeft: 'auto',
    transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0)',
    transition: 'transform 0.2s ease',
  };

  const contentContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    height: isCollapsed ? 0 : 'auto',
    overflow: 'hidden',
    opacity: isCollapsed ? 0 : 1,
    transition: 'height 0.3s ease, opacity 0.2s ease',
  };

  const displayedItems = items.slice(0, maxItems);
  const remainingCount = items.length - maxItems;

  return (
    <div className={`context-list ${className}`.trim()} style={containerStyles}>
      <div 
        style={headerStyles}
        onClick={() => setIsCollapsed(!isCollapsed)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsCollapsed(!isCollapsed);
          }
        }}
      >
        {icon && <span style={{ display: 'flex' }}>{icon}</span>}
        <span>Source Context</span>
        <span style={toggleIconStyles}>▼</span>
      </div>
      <div style={contentContainerStyles}>
        {displayedItems.map((item, index) => (
          <div key={index} style={itemStyles}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={titleStyles}>{item.title}</span>
              {item.confidence !== undefined && (
                <span style={confidenceStyles}>{Math.round(item.confidence * 100)}% match</span>
              )}
            </div>
            <div style={contentStyles}>{item.content}</div>
            {item.source && <div style={sourceStyles}>{item.source}</div>}
          </div>
        ))}
        {remainingCount > 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: `${theme.colors.text}60`,
            fontSize: '11px',
            marginTop: theme.spacing.xs 
          }}>
            +{remainingCount} more sources
          </div>
        )}
      </div>
    </div>
  );
};