# Chat UI Component Library

> ⚡ **Project Status**: This project is under very active development! We're constantly adding new features, improving existing components, and refining the API. Stay tuned for regular updates.

A modern React component library designed for building sophisticated AI chat interfaces. This library provides a comprehensive set of themeable components with built-in support for file handling, model selection, and AI processing states.


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

### Complete Theme Configuration

Create a custom theme by configuring all available tokens:

```tsx
const customTheme = {
  colors: {
    primary: '#007AFF',      // Primary accent color
    secondary: '#5856D6',    // Secondary accent color
    background: '#FFFFFF',   // Main background color
    text: '#000000',        // Main text color
    userBubbleBackground: '#007AFF',   // User message bubble background
    assistantBubbleBackground: '#E9ECEF', // AI message bubble background
    userBubbleText: '#FFFFFF',    // User message text color
    assistantBubbleText: '#000000' // AI message text color
  },
  spacing: {
    xs: '4px',    // Extra small spacing
    sm: '8px',    // Small spacing
    md: '16px',   // Medium spacing
    lg: '24px',   // Large spacing
    xl: '32px'    // Extra large spacing
  },
  borderRadius: {
    sm: '4px',    // Small border radius
    md: '8px',    // Medium border radius
    lg: '16px'    // Large border radius
  },
  typography: {
    fontSize: {
      small: '12px',    // Small text size
      medium: '14px',   // Medium text size
      large: '16px'     // Large text size
    },
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }
};

<ThemeProvider initialTheme={customTheme}>
  {/* Your app */}
</ThemeProvider>
```

### Built-in Themes

The library includes several pre-configured themes:

1. **Default Theme**: Clean, modern interface
   - Balanced spacing and neutral colors
   - Blue accent colors
   - System font stack

2. **Fruit Theme**: Apple-inspired design
   - iOS-style rounded corners
   - Green and blue accent colors
   - SF Pro font family
   - Elevated contrast

3. **Skylight Theme**: Microsoft Fluent Design
   - Microsoft blue color scheme
   - Subtle rounded corners
   - Segoe UI font family
   - High legibility

4. **Forest Theme**: Nature-inspired
   - Forest green primary colors
   - Earthy tones
   - Clean typography
   - Balanced contrast

5. **Twilight Theme**: Elegant purple
   - Soft purple accents
   - Light backgrounds
   - Modern typography
   - Subtle shadows

### Theme Best Practices

1. **Color Usage**
   - Use theme colors for consistency
   - Maintain good contrast ratios
   - Consider light/dark modes
   - Use opacity modifiers for variations

2. **Spacing**
   - Follow spacing scale for consistency
   - Use appropriate tokens for different contexts
   - Maintain rhythm with consistent spacing

3. **Typography**
   - Stick to the defined scale
   - Use appropriate sizes for hierarchy
   - Consider responsive adjustments

4. **Responsive Design**
   - Theme tokens work across screen sizes
   - Font sizes scale appropriately
   - Spacing adapts to viewport

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
