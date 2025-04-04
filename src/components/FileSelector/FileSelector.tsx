import React, { useRef, useState, InputHTMLAttributes } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface FileSelectorProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'ref' | 'onChange'> {
  /** Callback when files are selected */
  onFilesSelected: (files: File[]) => void;
  buttonText?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  /** Optional maximum number of files */
  maxFiles?: number;
  /** Optional className for styling */
  className?: string;
}

export const FileSelector: React.FC<FileSelectorProps> = ({
  onFilesSelected,
  className = '',
  disabled = false,
  buttonText = 'Attach File',
  icon = (<><svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 8h8M8 4v8" />
  </svg></>),
  iconPosition = 'left',
  maxFiles = 1,
  ...inputProps
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();

  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.theme.spacing.sm,
    padding: `${theme.theme.spacing.sm} ${theme.theme.spacing.md}`,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.theme.colors.text}20`,
    borderRadius: theme.theme.borderRadius.md,
    color: theme.theme.colors.text,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: theme.theme.typography.fontSize.small,
    fontFamily: theme.theme.typography.fontFamily,
    opacity: disabled ? 0.6 : 1,
    transition: 'background-color 0.2s',
    maxHeight: theme.theme.spacing.xl,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = `${theme.theme.colors.text}10`;
    }
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setError(undefined);

    if (files.length > maxFiles) {
      setError(`Maximum ${maxFiles} file${maxFiles === 1 ? '' : 's'} allowed`);
      return;
    }

    if (inputProps.maxLength) {
      const oversizedFiles = files.filter(file => file.size > inputProps.maxLength!);
      if (oversizedFiles.length > 0) {
        setError(`File${oversizedFiles.length > 1 ? 's' : ''} exceed${oversizedFiles.length === 1 ? 's' : ''} size limit of ${formatFileSize(inputProps.maxLength)}`);
        return;
      }
    }

    onFilesSelected(files);
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const errorStyles: React.CSSProperties = {
    color: '#ef4444',
    fontSize: theme.theme.typography.fontSize.small,
    marginTop: theme.theme.spacing.xs,
  };

  return (
    <div className={`file-selector ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        style={buttonStyles}
        disabled={disabled}
      >
        {iconPosition === 'left' && icon}
        {buttonText && buttonText}
        {iconPosition === 'right' && icon}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        multiple={maxFiles > 1}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={disabled}
        {...inputProps}
      />
      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};