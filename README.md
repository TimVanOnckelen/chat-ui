# Chat UI Component Library

A modern React component library designed for building sophisticated AI chat interfaces. This library provides a comprehensive set of themeable components with built-in support for file handling, model selection, and AI processing states.

## Overview

Try out the complete chat interface in our [Storybook](https://your-storybook-url.com) to see all components working together.

![Chat UI Preview](preview.png)

## Key Features

- 🎨 **Advanced Theming System**
  - Multiple built-in themes (Default, Apple-style, Microsoft Fluent)
  - Fully customizable colors, spacing, typography
  - Dark/light mode support
  - Design token consistency

- 💬 **Complete Chat Components**
  - Auto-scrolling message container
  - User/AI message bubbles
  - Multi-line input with keyboard shortcuts
  - Thread management
  - Model selection
  - Reasoning toggle

- 📁 **File Handling**
  - Drag and drop uploads
  - Type validation
  - Size limits
  - Preview management
  - Progress tracking

- ⚡ **Real-time Feedback**
  - AI processing indicators
  - Progress tracking
  - Error states
  - Loading animations

## Quick Start

1. Install the package:
```bash
npm install
```

2. Start Storybook to explore components:
```bash
npm run storybook
```

3. Basic usage:
```tsx
import { ThemeProvider, ChatContainer, ChatInput } from './components';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    setMessages([...messages, { 
      id: Date.now(),
      message,
      isUser: true 
    }]);
  };

  return (
    <ThemeProvider initialTheme="default">
      <ChatContainer messages={messages} />
      <ChatInput onSubmit={handleSend} />
    </ThemeProvider>
  );
}
```

## Available Components

### Core Chat Interface
- `ChatContainer`: Main message container with auto-scroll
- `ChatBubble`: Message bubbles for user and AI responses
- `ChatInput`: Text input with file attachment support
- `ChatSelector`: Switch between chat threads

### Controls
- `ModelSelector`: Choose between different AI models
- `ReasoningToggle`: Toggle AI reasoning display
- `FileSelector`: File upload with validation
- `SelectedFiles`: Manage uploaded files

### Feedback
- `AIProcessingIndicator`: Show AI processing state with progress

## Theming

The library includes several built-in themes and supports custom themes:

```tsx
// Use built-in theme
<ThemeProvider initialTheme="fruit">
  {/* Your app */}
</ThemeProvider>

// Or create custom theme
const customTheme = {
  colors: {
    primary: '#2E5CD3',
    background: '#FFFFFF',
    // ... other tokens
  },
  // ... other theme settings
};

<ThemeProvider initialTheme={customTheme}>
  {/* Your app */}
</ThemeProvider>
```

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Run tests
npm test

# Build package
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
