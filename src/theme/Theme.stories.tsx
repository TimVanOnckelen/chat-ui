import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { ChatBubble } from '../components/ChatBubble/ChatBubble';
import { ModelSelector } from '../components/ModelSelector/ModelSelector';

const ThemeDemo = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');

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

  return (
    <ThemeProvider initialTheme={selectedTheme}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
        <ModelSelector
          models={themes}
          selectedModel={selectedTheme}
          onModelChange={setSelectedTheme}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <ChatBubble
            message="Hello! How can I help you today?"
            isUser={false}
            timestamp="12:30 PM"
          />
          <ChatBubble
            message="I need help with theme selection."
            isUser={true}
            timestamp="12:31 PM"
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

const meta = {
  title: 'Theme/ThemeDemo',
  component: ThemeDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};