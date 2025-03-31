import { useState } from 'react'
import './App.css'
import { ThemeProvider, useTheme } from './theme/ThemeProvider'
import { ModelSelector } from './components/ModelSelector/ModelSelector'
import { ChatContainer } from './components/ChatContainer/ChatContainer'
import { ChatInput } from './components/ChatInput/ChatInput'
import { ChatMessage } from './components/ChatContainer/ChatContainer'

const themes = [
  { 
    id: 'default', 
    name: 'Default Theme', 
    description: 'Standard chat interface theme'
  },
  { 
    id: 'apple', 
    name: 'Apple Theme', 
    description: 'iOS-style messaging interface'
  },
  { 
    id: 'fluent', 
    name: 'Fluent Theme', 
    description: 'Microsoft Fluent design system'
  }
];

function AppContent() {
  const { setThemeType } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('default');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleThemeChange = (newTheme: string) => {
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
