import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface Chat {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
}

export interface ChatSelectorProps {
  /** List of available chats */
  chats: Chat[];
  /** Currently selected chat ID */
  selectedChat: string;
  /** Callback when chat is selected */
  onChatSelect: (chatId: string) => void;
  /** Callback when new chat is requested */
  onNewChat?: () => void;
  /** Optional className for styling */
  className?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Position of the sidebar: 'left' or 'right' */
  position?: 'left' | 'right';
  /** Whether the sidebar is initially open (uncontrolled mode) */
  defaultOpen?: boolean;
  /** Control whether the sidebar is open (controlled mode) */
  isOpen?: boolean;
  /** Callback when sidebar is toggled */
  onToggle?: (open: boolean) => void;
  /** Custom content for the toggle button */
  chatButtonContent?: React.ReactNode;
  /** Custom content for the new chat button */
  newChatButtonContent?: React.ReactNode;
  /** Title displayed at the top of the sidebar */
  title?: string;
  /** Whether to automatically close sidebar after selection */
  autoCloseOnSelect?: boolean;
  /** Whether to show the built-in toggle button */
  showToggleButton?: boolean;
  /** Style overrides for the toggle button */
  toggleButtonStyle?: React.CSSProperties;

  showCloseButton?: boolean;
  closeButtonContent?: React.ReactNode;
}

/**
 * Creates a toggle button that can be placed anywhere to control the sidebar
 */
export const ChatSelectorToggle: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  position?: 'left' | 'right';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ 
  isOpen, 
  onToggle, 
  disabled = false, 
  position = 'left',
  style = {},
  children
}) => {
  const theme = useTheme();
  
  const toggleButtonStyles: React.CSSProperties = {
    backgroundColor: theme.theme.colors.background,
    border: `1px solid ${theme.theme.colors.text}20`,
    borderRadius: theme.theme.borderRadius.md,
    color: theme.theme.colors.text,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    opacity: disabled ? 0.6 : 1,
    ...style
  };
  
  return (
    <button
      type="button"
      onClick={onToggle}
      style={toggleButtonStyles}
      disabled={disabled}
      aria-label={isOpen ? "Close chat sidebar" : "Open chat sidebar"}
    >
      {children || (isOpen ? (position === 'left' ? '◄' : '►') : (position === 'left' ? '►' : '◄'))}
    </button>
  );
};

export const ChatSelector: React.FC<ChatSelectorProps> = ({
  chats,
  selectedChat,
  onChatSelect,
  onNewChat,
  className = '',
  disabled = false,
  position = 'left',
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  newChatButtonContent = 'New Chat',
  chatButtonContent = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  title = 'Chats',
  autoCloseOnSelect = true,
  showToggleButton = true,
  toggleButtonStyle = {},
  showCloseButton = true,
  closeButtonContent
}) => {
  const theme = useTheme();
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
  
  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    [position]: 0,
    zIndex: 1000,
    bottom: '10px',
    transition: 'transform 0.3s ease',
    transform: isOpen ? 'translateX(0)' : `translateX(${position === 'left' ? '-100%' : '100%'})`,
    display: 'flex',
    fontFamily: theme.theme.typography.fontFamily,
    fontSize: theme.theme.typography.fontSize.medium,
  };

  const sidebarStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.theme.colors.background,
    border: `1px solid ${theme.theme.colors.text}20`,
    borderRadius: position === 'left' ? '0 8px 8px 0' : '8px 0 0 8px',
    width: '300px',
    overflowY: 'auto',
  };

  const chatItemStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.theme.spacing.md,
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.theme.colors.text}10`,
    transition: 'background-color 0.2s',
  };

  const newChatButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.theme.spacing.sm,
    padding: theme.theme.spacing.md,
    width: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.theme.colors.primary,
    cursor: 'pointer',
    fontSize: theme.theme.typography.fontSize.small,
    transition: 'background-color 0.2s',
  };

  const handleItemHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = `${theme.theme.colors.text}10`;
  };

  const handleItemLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const chatId = e.currentTarget.dataset.chatId;
    e.currentTarget.style.backgroundColor = chatId === selectedChat ? `${theme.theme.colors.text}10` : 'transparent';
  };

  const handleNewChatHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = `${theme.theme.colors.text}10`;
  };

  const handleNewChatLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handleToggle = () => {
    if (!disabled) {
      if (isControlled) {
        // In controlled mode, call the onToggle callback
        onToggle?.(!isOpen);
      } else {
        // In uncontrolled mode, update internal state
        setUncontrolledIsOpen(!isOpen);
      }
    }
  };

  const handleSelect = (chatId: string) => {
    onChatSelect(chatId);
    if (autoCloseOnSelect) {
      // Handle closing based on controlled/uncontrolled state
      if (isControlled) {
        onToggle?.(false);
      } else {
        setUncontrolledIsOpen(false);
      }
    }
  };

  return (
    <div className={`chat-selector-sidebar ${className}`} style={containerStyles}>
      {showToggleButton && (
        <ChatSelectorToggle
          isOpen={isOpen}
          onToggle={handleToggle}
          disabled={disabled}
          position={position}
          style={{
            position: 'absolute',
            top: '20px',
            [position === 'left' ? 'right' : 'left']: '-40px',
            borderRadius: position === 'left' ? '0 4px 4px 0' : '4px 0 0 4px',
            ...toggleButtonStyle
          }}
        >
          {chatButtonContent}
        </ChatSelectorToggle>
      )}
      
      {isOpen && (
        <div style={sidebarStyles}>
        <div style={{ 
          padding: theme.theme.spacing.md,
          borderBottom: `1px solid ${theme.theme.colors.text}20`,
          fontWeight: 'bold',
        }}>
          {title}
        </div>
        {showCloseButton && (
          closeButtonContent ? closeButtonContent : (<button 
            onClick={handleToggle}
            style={{
              position: 'absolute',
              top: theme.theme.spacing.sm,
              right: theme.theme.spacing.sm,
              backgroundColor: 'transparent',
              border: 'none',
              color: theme.theme.colors.text,
              cursor: 'pointer',
            }}>Close</button>)
)}
        
        {onNewChat && (
          <button 
            onClick={onNewChat} 
            style={newChatButtonStyles}
            onMouseEnter={handleNewChatHover}
            onMouseLeave={handleNewChatLeave}
          >
            {newChatButtonContent}
          </button>
        )}
        

        
        <div style={{ overflow: 'auto', flexGrow: 1 }}>
          {chats.map((chat) => (
            <div
              key={chat.id}
              data-chat-id={chat.id}
              onClick={() => handleSelect(chat.id)}
              onMouseEnter={handleItemHover}
              onMouseLeave={handleItemLeave}
              style={{
                ...chatItemStyles,
                backgroundColor: chat.id === selectedChat ? `${theme.theme.colors.text}10` : undefined,
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
                <span style={{ fontWeight: 500 }}>{chat.title}</span>
                {chat.timestamp && (
                  <span style={{ 
                    fontSize: theme.theme.typography.fontSize.small,
                    color: `${theme.theme.colors.text}80`,
                  }}>
                    {chat.timestamp}
                  </span>
                )}
              </div>
              {chat.lastMessage && (
                <span style={{ 
                  fontSize: theme.theme.typography.fontSize.small,
                  color: `${theme.theme.colors.text}80`,
                  marginTop: theme.theme.spacing.xs,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {chat.lastMessage}
                </span>
              )}
              {chat.unreadCount ? (
                <span style={{
                  position: 'absolute',
                  right: theme.theme.spacing.sm,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: theme.theme.colors.primary,
                  color: '#fff',
                  borderRadius: '50%',
                  minWidth: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.theme.typography.fontSize.small,
                }}>
                  {chat.unreadCount}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      )}
      
    </div>
  );
};