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
}

export const ChatSelector: React.FC<ChatSelectorProps> = ({
  chats,
  selectedChat,
  onChatSelect,
  onNewChat,
  className = '',
  disabled = false,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentChat = chats.find(chat => chat.id === selectedChat) || chats[0];

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
    top: '100%',
    left: 0,
    marginTop: theme.theme.spacing.xs,
    backgroundColor: theme.theme.colors.background,
    border: `1px solid ${theme.theme.colors.text}20`,
    borderRadius: theme.theme.borderRadius.md,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    minWidth: '250px',
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 1000,
  };

  const chatItemStyles: React.CSSProperties = {
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

  const handleSelect = (chatId: string) => {
    onChatSelect(chatId);
    setIsOpen(false);
  };

  return (
    <div className={`chat-selector ${className}`} style={containerStyles}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={buttonStyles}
        disabled={disabled}
      >
        {currentChat?.title || 'Select Chat'}
        <span style={{ marginLeft: 'auto' }}>▼</span>
      </button>
      {isOpen && !disabled && (
        <div style={dropdownStyles}>
          {onNewChat && (
            <button 
              onClick={onNewChat} 
              style={newChatButtonStyles}
              onMouseEnter={handleNewChatHover}
              onMouseLeave={handleNewChatLeave}
            >
              <span style={{ fontSize: '1.2em' }}>+</span>
              New Chat
            </button>
          )}
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
      )}
    </div>
  );
};