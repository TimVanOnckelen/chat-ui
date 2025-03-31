import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface SelectedFile {
  id: string;
  name: string;
  size: number;
  type?: string;
}

export interface SelectedFilesProps {
  /** Array of selected files */
  files: SelectedFile[];
  /** Callback when a file is removed */
  onRemoveFile: (fileId: string) => void;
  /** Optional className for styling */
  className?: string;
}

export const SelectedFiles: React.FC<SelectedFilesProps> = ({
  files,
  onRemoveFile,
  className = '',
}) => {
  const theme = useTheme();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.theme.spacing.sm,
    width: '100%',
  };

  const fileItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.theme.spacing.xs,
    padding: `${theme.theme.spacing.xs} ${theme.theme.spacing.sm}`,
    backgroundColor: `${theme.theme.colors.text}10`,
    borderRadius: theme.theme.borderRadius.sm,
    fontSize: theme.theme.typography.fontSize.small,
    color: theme.theme.colors.text,
  };

  const removeButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    border: 'none',
    backgroundColor: 'transparent',
    color: `${theme.theme.colors.text}80`,
    cursor: 'pointer',
    borderRadius: '50%',
    transition: 'all 0.2s',
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const getFileIcon = (type?: string) => {
    // Default file icon
    const defaultIcon = (
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.5 1H2a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V4.5L6.5 1z" />
        <path d="M6.5 1v3.5H11" />
      </svg>
    );

    // You can add more specific icons based on file type
    if (type?.startsWith('image/')) {
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="12" height="12" rx="1" />
          <circle cx="4.5" cy="4.5" r="1.5" />
          <path d="M13 9l-3-3-6 6" />
        </svg>
      );
    }

    return defaultIcon;
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className={`selected-files ${className}`} style={containerStyles}>
      {files.map((file) => (
        <div key={file.id} style={fileItemStyles}>
          {getFileIcon(file.type)}
          <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {file.name}
          </span>
          <span style={{ color: `${theme.theme.colors.text}60`, marginLeft: theme.theme.spacing.xs }}>
            ({formatFileSize(file.size)})
          </span>
          <button
            type="button"
            onClick={() => onRemoveFile(file.id)}
            style={removeButtonStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.theme.colors.text}10`;
              e.currentTarget.style.color = theme.theme.colors.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = `${theme.theme.colors.text}80`;
            }}
            aria-label={`Remove ${file.name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};