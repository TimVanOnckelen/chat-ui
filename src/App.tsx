import { useState } from 'react'
import './App.css'
import { ThemeProvider, useTheme } from './theme/ThemeProvider'
import { ModelSelector } from './components/ModelSelector/ModelSelector'
import { ChatContainer } from './components/ChatContainer/ChatContainer'
import { ChatInput } from './components/ChatInput/ChatInput'
import { ChatMessage } from './components/ChatContainer/ChatContainer'

type ThemeType = 'default' | 'fruit' | 'skylight' | 'forest' | 'twilight' | 'copilot' | 'custom';

const themes = [
  { 
    id: 'default', 
    name: 'Default Theme', 
    description: 'Standard chat interface theme'
  },
  { 
    id: 'fruit', 
    name: 'Fruit Theme', 
    description: 'iOS-style messaging interface'
  },
  { 
    id: 'skylight', 
    name: 'Skylight Theme', 
    description: 'Microsoft Fluent design system'
  },
  { 
    id: 'forest', 
    name: 'Forest Theme', 
    description: 'Nature-inspired green theme'
  },
  { 
    id: 'twilight', 
    name: 'Twilight Theme', 
    description: 'Elegant purple theme'
  },
  { 
    id: 'copilot', 
    name: 'Copilot Theme', 
    description: 'GitHub Copilot dark theme'
  }
];

function AppContent() {
  const { setThemeType } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! How can I help you today?',
      isUser: false,
      timestamp: '10:00 AM',
      extraContent: <span style={{ 
        backgroundColor: '#10B981',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 500
      }}>GPT-4</span>
    },
    {
      id: '2',
      message: 'I need help with a coding problem.',
      isUser: true,
      timestamp: '10:01 AM'
    },
    {
      id: '3',
      message: "I'll be happy to help! Could you describe the problem you're facing?",
      isUser: false,
      timestamp: '10:01 AM',
      extraContent: <span style={{ 
        backgroundColor: '#10B981',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 500
      }}>GPT-4</span>
    }
  ]);

  const handleThemeChange = (modelId: string) => {
    const newTheme = modelId as ThemeType;
    setCurrentTheme(newTheme);
    setThemeType(newTheme);
  };

  const handleSendMessage = (message: string) => {
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        message,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="app-container">
      <ModelSelector
        models={themes}
        selectedModel={currentTheme}
        onModelChange={handleThemeChange}
      />
      <div className="chat-section">
        <ChatContainer messages={messages} />
        <ChatInput onSubmit={handleSendMessage} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider initialTheme="default">
      <AppContent />
    </ThemeProvider>
  );
}

export default App
