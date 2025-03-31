import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface Model {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface ModelSelectorProps {
  /** Available models */
  models: Model[];
  /** Currently selected model */
  selectedModel: string;
  /** Callback when model is changed */
  onModelChange: (modelId: string) => void;
  /** Optional className for styling */
  className?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onModelChange,
  className = '',
  disabled = false,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentModel = models.find(model => model.id === selectedModel) || models[0];

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.theme.spacing.sm,
    padding: `${theme.theme.spacing.sm} ${theme.theme.spacing.md}`,
    backgroundColor: theme.theme.colors.background,
    border: `1px solid ${theme.theme.colors.text}20`,
    borderRadius: theme.theme.borderRadius.md,
    color: theme.theme.colors.text,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: theme.theme.typography.fontSize.small,
    opacity: disabled ? 0.6 : 1,
  };

  const dropdownStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    marginBottom: theme.theme.spacing.xs,
    backgroundColor: theme.theme.colors.background,
    border: `1px solid ${theme.theme.colors.text}20`,
    borderRadius: theme.theme.borderRadius.md,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    minWidth: '200px',
    maxHeight: '300px',
    overflowY: 'auto',
    zIndex: 1000,
  };

  const optionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.theme.spacing.sm,
    padding: theme.theme.spacing.md,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const handleOptionHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = `${theme.theme.colors.text}10`;
  };

  const handleOptionLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handleSelect = (modelId: string) => {
    onModelChange(modelId);
    setIsOpen(false);
  };

  return (
    <div className={`model-selector ${className}`} style={containerStyles}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={buttonStyles}
        disabled={disabled}
      >
        {currentModel.icon}
        {currentModel.name}
        <span style={{ marginLeft: 'auto' }}>▼</span>
      </button>
      {isOpen && !disabled && (
        <div style={dropdownStyles}>
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => handleSelect(model.id)}
              onMouseEnter={handleOptionHover}
              onMouseLeave={handleOptionLeave}
              style={{
                ...optionStyles,
                backgroundColor: model.id === selectedModel ? `${theme.theme.colors.text}10` : undefined,
              }}
            >
              {model.icon}
              <div>
                <div>{model.name}</div>
                {model.description && (
                  <div style={{ 
                    fontSize: theme.theme.typography.fontSize.small,
                    color: `${theme.theme.colors.text}80`,
                  }}>
                    {model.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};