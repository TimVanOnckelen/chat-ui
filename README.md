# Chat UI Component Library
A modern, themeable React component library for building AI chat interfaces. Built with TypeScript and React, this library provides a comprehensive set of components for creating chat applications with support for multiple themes.

> ⚠️ **Development Status**: This project is under active development and currently in an unstable state. APIs and features may change without notice.

## Features

- 🎨 **Themeable Components**: Includes Default, Apple, and Fluent design themes
- 💬 **Chat Components**: Chat bubbles, inputs, containers, and selectors
- 📁 **File Handling**: File selection and preview components
- 🔄 **Processing States**: AI processing indicators with progress feedback
- 📱 **Responsive Design**: Components adapt to different screen sizes
- ♿ **Accessibility**: Built with ARIA support and keyboard navigation
- 📚 **Storybook Documentation**: Full component documentation and examples

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Run Storybook to view component documentation:

```bash
npm run storybook
```

## Available Components

### Chat Interface
- `ChatBubble`: Message bubbles for user and AI responses
- `ChatContainer`: Container for chat messages with auto-scroll
- `ChatInput`: Text input with file attachment support
- `ChatSelector`: Dropdown for switching between chat threads

### File Management
- `FileSelector`: File upload component with drag-and-drop
- `SelectedFiles`: Display and manage selected files

### UI Elements
- `ModelSelector`: Switch between different AI models or themes
- `AIProcessingIndicator`: Show AI processing state with progress

### Theming
- Customizable themes with support for:
  - Colors and color schemes
  - Typography
  - Spacing
  - Border radius
  - Light/dark mode

## Usage Example

```tsx
import { ThemeProvider, ChatContainer, ChatInput } from './components';

function App() {
  return (
    <ThemeProvider initialTheme="default">
      <ChatContainer messages={messages} />
      <ChatInput onSubmit={handleSubmit} />
    </ThemeProvider>
  );
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
