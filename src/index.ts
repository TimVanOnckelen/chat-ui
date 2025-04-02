// Components
export { AIProcessingIndicator } from './components/AIProcessingIndicator/AIProcessingIndicator';
export type { AIProcessingIndicatorProps } from './components/AIProcessingIndicator/AIProcessingIndicator';

export { ChatBubble } from './components/ChatBubble/ChatBubble';
export type { ChatBubbleProps } from './components/ChatBubble/ChatBubble';

export { ChatContainer } from './components/ChatContainer/ChatContainer';
export type { ChatContainerProps, ChatMessage } from './components/ChatContainer/ChatContainer';

export { ChatInput } from './components/ChatInput/ChatInput';
export type { ChatInputProps } from './components/ChatInput/ChatInput';

export { ChatSelector } from './components/ChatSelector/ChatSelector';
export type { ChatSelectorProps, Chat } from './components/ChatSelector/ChatSelector';

export { FileSelector } from './components/FileSelector/FileSelector';
export type { FileSelectorProps } from './components/FileSelector/FileSelector';

export { ModelSelector } from './components/ModelSelector/ModelSelector';
export type { ModelSelectorProps, Model } from './components/ModelSelector/ModelSelector';

export { ReasoningToggle } from './components/ReasoningToggle/ReasoningToggle';
export type { ReasoningToggleProps } from './components/ReasoningToggle/ReasoningToggle';

export { ReasoningBubble } from './components/ReasoningToggle/ReasoningBubble';
export type { ReasoningBubbleProps } from './components/ReasoningToggle/ReasoningBubble';

export { SelectedFiles } from './components/SelectedFiles/SelectedFiles';
export type { SelectedFilesProps, SelectedFile } from './components/SelectedFiles/SelectedFiles';

export { ContextList } from './components/ContextList/ContextList';
export type { ContextListProps, ContextItem } from './components/ContextList/ContextList';

// Theme
export { ThemeProvider, useTheme } from './theme/ThemeProvider';
export type { ChatTheme } from './theme/theme.types';
export { defaultTheme, fruitTheme, skylightTheme, forestTheme, twilightTheme } from './theme/theme.types';