# Chat UI Component Library

<p align="center">
<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="200" fill="white"/>

  <path d="M30 40 h200 a10 10 0 0 1 10 10 v80 a10 10 0 0 1 -10 10 h-90 l-25 20 v-20 h-85 a10 10 0 0 1 -10 -10 v-80 a10 10 0 0 1 10 -10 z" fill="#3B82F6"/>

  <text x="50" y="80" font-family="Arial, sans-serif" font-size="28" fill="white" font-weight="bold">ChatUI</text>

  <g transform="translate(180, 95)">
    <rect x="-15" y="-15" width="30" height="30" rx="6" fill="#10B981"/>
    <circle cx="-7" cy="-5" r="3" fill="white"/>
    <circle cx="7" cy="-5" r="3" fill="white"/>
    <rect x="-5" y="5" width="10" height="3" rx="1.5" fill="white"/>
    <line x1="0" y1="-20" x2="0" y2="-15" stroke="#10B981" stroke-width="2"/>
    <circle cx="0" cy="-22" r="2" fill="#10B981"/>
  </g>
</svg>

</p>

[![NPM Version](https://img.shields.io/npm/v/@timvanonckelen/chat-ui)](https://www.npmjs.com/package/@timvanonckelen/chat-ui)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://timvanonckelen.github.io/chat-ui/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> ⚡ **Project Status**: This project is under active development. Stay tuned for regular updates. Some features may change or break in upcoming versions.

A modern React component library for building sophisticated AI chat interfaces. Provides themeable components with built-in support for file handling, model selection, and AI processing states.

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
npm install @timvanonckelen/chat-ui
```

Basic usage:
```tsx
import { ThemeProvider, ChatContainer, ChatInput } from '@timvanonckelen/chat-ui';

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

Visit our [Storybook](https://timvanonckelen.github.io/chat-ui/) for detailed documentation, component examples, and theme customization.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE) © Tim Van Onckelen
