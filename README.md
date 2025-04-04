# ChatKit React

[![NPM Version](https://img.shields.io/npm/v/@thexerobe/chatkit-react)](https://www.npmjs.com/package/chatkit-react)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://timvanonckelen.github.io/chatkit-react/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> ⚡ **Project Status**: This project is under active development. Stay tuned for regular updates. Some features may change or break in upcoming versions.

A modern React component library for building sophisticated AI chat interfaces. Provides themeable components with built-in support for file handling, model selection, and AI processing states.s

![Overview ChatKit](./assets/screenshot_1.png)
## Requirements

- React 19 or higher
- Framework agnostic - can be used with any CSS framework through class injection

## Key Features

- 🎨 **Advanced Theming System** - Multiple built-in themes with full customization
- 💬 **Complete Chat Components** - Messages, inputs, threads, and model selection
- 📁 **File Handling** - Drag & drop uploads with validation
- ⚡ **Real-time Feedback** - Processing indicators and states
- 🔄 **Framework Agnostic** - No CSS dependencies, works with any styling solution

## Quick Start

```bash
npm install chatkit-react
```

Basic usage:
```tsx
import { ThemeProvider, ChatContainer, ChatInput } from 'chatkit-react';

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

## Documentation

Visit our [Storybook](https://timvanonckelen.github.io/chatkit-react/) for detailed documentation, component examples, and theme customization.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE) © Tim Van Onckelen
