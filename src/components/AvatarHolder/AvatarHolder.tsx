import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface AvatarHolderProps {
  /** Text to display (usually initials). Will be ignored if image is provided */
  text?: string;
  /** URL of the image to display */
  image?: string;
  /** Size of the avatar in pixels. Defaults to 40 */
  size?: number;
  /** Optional className for styling */
  className?: string;
  /** Optional background color override. Uses theme background if not provided */
  backgroundColor?: string;
  /** Optional text color override. Uses theme text color if not provided */
  textColor?: string;
}

export const AvatarHolder: React.FC<AvatarHolderProps> = ({
  text,
  image,
  size = 40,
  className = '',
  backgroundColor,
  textColor,
}) => {
  const theme = useTheme();

  const containerStyles: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor || theme.theme.colors.background,
    color: textColor || theme.theme.colors.text,
    fontSize: Math.floor(size * 0.4),
    fontFamily: theme.theme.typography.fontFamily,
    lineHeight: `${size}px`,
    fontWeight: 500,
    overflow: 'hidden',
    flexShrink: 0,
    border: `1px solid ${theme.theme.colors.text}20`,
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  // Get first letter of each word, up to 2 letters
  const initials = text
    ? text
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className={`avatar-holder ${className}`} style={containerStyles}>
      {image ? (
        <img src={image} alt={text || 'Avatar'} style={imageStyles} />
      ) : (
        text && <span>{initials}</span>
      )}
    </div>
  );
};