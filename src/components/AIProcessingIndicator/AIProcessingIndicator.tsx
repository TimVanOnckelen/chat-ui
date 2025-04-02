import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface AIProcessingIndicatorProps {
  /** Additional CSS class name */
  className?: string;
  /** Optional text to show next to the indicator */
  text?: string;
  /** The size of the loading dots in pixels */
  dotSize?: number;
  /** Progress value between 0 and 1 */
  progress?: number;
  /** Whether to show the progress bar */
  showProgress?: boolean;
  /** Width of the progress bar. Can be a number (pixels) or string (CSS value) */
  progressWidth?: number | string;
  /** Height of the progress bar in pixels */
  progressHeight?: number;

  borderRadius?: number;
}

export const AIProcessingIndicator: React.FC<AIProcessingIndicatorProps> = ({
  className = '',
  text = 'Processing',
  dotSize = 4,
  progress = 0,
  showProgress = false,
  progressWidth = 60,
  progressHeight = 4,
  borderRadius = 4,
}) => {
  const theme = useTheme();
  const progressPercentage = Math.min(Math.max(progress * 100, 0), 100);
  const isComplete = progressPercentage === 100;

  const containerStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.theme.spacing.sm,
    fontSize: theme.theme.typography.fontSize.small,
    color: `${theme.theme.colors.text}99`,
    fontFamily: theme.theme.typography.fontFamily,
    width: showProgress ? '100%' : undefined,
  };

  const dotsContainerStyles: React.CSSProperties = {
    display: 'inline-flex',
    gap: theme.theme.spacing.xs,
  };

  const dotStyles: React.CSSProperties = {
    width: `${dotSize}px`,
    height: `${dotSize}px`,
    borderRadius: borderRadius,
    backgroundColor: 'currentColor',
    animation: 'processingDotPulse 1.4s infinite ease-in-out',
  };

  const progressContainerStyles: React.CSSProperties = {
    width: typeof progressWidth === 'number' ? `${progressWidth}px` : progressWidth,
    height: `${progressHeight}px`,
    backgroundColor: `${theme.theme.colors.text}20`,
    borderRadius: borderRadius,
    overflow: 'hidden',
    position: 'relative',
  };

  const progressBarStyles: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${progressPercentage}%`,
    background: `linear-gradient(90deg, 
      ${theme.theme.colors.primary}80,
      ${theme.theme.colors.primary},
      ${theme.theme.colors.secondary}
    )`,
    backgroundSize: '200% 100%',
    animation: isComplete ? 'none' : 'progressGradient 2s ease infinite',
    borderRadius: isComplete ? `${borderRadius / 2}px` : `${borderRadius / 2}px 0 0 ${borderRadius / 2}px`,
    transition: 'width 0.3s ease-in-out, border-radius 0.3s ease-in-out',
    boxShadow: `0 0 ${progressHeight * 2.5}px ${theme.theme.colors.primary}80,
                0 0 ${progressHeight * 1.25}px ${theme.theme.colors.primary}40`,
    filter: 'brightness(1.1)',
  };

  const glowEffectStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, 
      transparent 0%,
      ${theme.theme.colors.primary}40 50%,
      transparent 100%
    )`,
    animation: 'glowingEffect 1.5s ease-in-out infinite',
    transform: 'translateX(-100%)',
  };

  return (
    <div className={`ai-processing-indicator ${className}`} style={containerStyles}>
      {text && <span>{text}</span>}
      {showProgress ? (
        <div style={progressContainerStyles}>
          <div style={progressBarStyles} />
          <div style={glowEffectStyles} />
        </div>
      ) : (
        <div style={dotsContainerStyles}>
          <div style={{ ...dotStyles, animationDelay: '0s' }} />
          <div style={{ ...dotStyles, animationDelay: '0.2s' }} />
          <div style={{ ...dotStyles, animationDelay: '0.4s' }} />
        </div>
      )}
      <style>
        {`
          @keyframes processingDotPulse {
            0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1); }
          }
          @keyframes progressGradient {
            0% { background-position: 100% 50%; }
            50% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @keyframes glowingEffect {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};