import type { Meta } from '@storybook/react';
import { useState, useMemo } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { ChatBubble } from '../components/ChatBubble/ChatBubble';
import { ChatInput } from '../components/ChatInput/ChatInput';
import { ChatTheme } from './theme.types';

interface ThemeGeneratorProps {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  userBubbleBackground: string;
  assistantBubbleBackground: string;
  userBubbleText: string;
  assistantBubbleText: string;
  fontFamily: string;
  borderRadiusSm: string;
  borderRadiusMd: string;
  borderRadiusLg: string;
  spacingSm: string;
  spacingMd: string;
  fontSizeSmall: string;
  fontSizeMedium: string;
  fontSizeLarge: string;
}

const ThemeGenerator = ({
  primaryColor = '#007AFF',
  secondaryColor = '#5856D6',
  backgroundColor = '#FFFFFF',
  textColor = '#000000',
  userBubbleBackground = '#007AFF',
  assistantBubbleBackground = '#E9ECEF',
  userBubbleText = '#FFFFFF',
  assistantBubbleText = '#000000',
  fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  borderRadiusSm = '4px',
  borderRadiusMd = '8px',
  borderRadiusLg = '16px',
  spacingSm = '8px',
  spacingMd = '16px',
  fontSizeSmall = '12px',
  fontSizeMedium = '14px',
  fontSizeLarge = '16px',
}: ThemeGeneratorProps) => {
  const [message, setMessage] = useState('');

  const customTheme = useMemo<ChatTheme>(() => ({
    colors: {
      primary: primaryColor,
      secondary: secondaryColor,
      background: backgroundColor,
      text: textColor,
      userBubbleBackground,
      assistantBubbleBackground,
      userBubbleText,
      assistantBubbleText,
    },
    spacing: {
      xs: '4px',
      sm: spacingSm,
      md: spacingMd,
      lg: '24px',
      xl: '32px',
    },
    borderRadius: {
      sm: borderRadiusSm,
      md: borderRadiusMd,
      lg: borderRadiusLg,
    },
    typography: {
      fontSize: {
        small: fontSizeSmall,
        medium: fontSizeMedium,
        large: fontSizeLarge,
      },
      fontFamily,
    },
  }), [
    primaryColor, secondaryColor, backgroundColor, textColor,
    userBubbleBackground, assistantBubbleBackground,
    userBubbleText, assistantBubbleText,
    fontFamily, borderRadiusSm, borderRadiusMd, borderRadiusLg,
    spacingSm, spacingMd,
    fontSizeSmall, fontSizeMedium, fontSizeLarge,
  ]);

  const handleSend = (text: string) => {
    setMessage(text);
  };

  const themeCode = `const customTheme = ${JSON.stringify(customTheme, null, 2)};

// Use theme in your application:
<ThemeProvider initialTheme="custom" customTheme={customTheme}>
  {/* Your app */}
</ThemeProvider>`;

  return (
    <ThemeProvider initialTheme="custom" customTheme={customTheme}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px', 
        padding: '16px', 
        maxWidth: '800px', 
        background: customTheme.colors.background,
        color: customTheme.colors.text,
        borderRadius: customTheme.borderRadius.md,
      }}>
        <h2>Theme Preview</h2>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          maxWidth: '400px', 
          border: `1px solid ${customTheme.colors.secondary}30`, 
          borderRadius: customTheme.borderRadius.md,
          padding: customTheme.spacing.md,
        }}>
          <ChatBubble
            message="Hello! How can I help you today?"
            isUser={false}
            timestamp="12:30 PM"
          />
          <ChatBubble
            message="I'm testing this custom theme in Storybook."
            isUser={true}
            timestamp="12:31 PM"
          />
          {message && (
            <ChatBubble
              message={message}
              isUser={false}
              timestamp={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          )}
          <ChatInput
            onSubmit={handleSend}
            placeholder="Type a message..."
          />
        </div>

        <div style={{ 
          marginTop: '20px', 
          backgroundColor: '#f5f5f5', 
          padding: '12px', 
          borderRadius: '4px',
          color: '#333',
          fontFamily: 'monospace',
        }}>
          <h3>Theme Code</h3>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontSize: '12px',
            overflowX: 'auto',
          }}>
            {themeCode}
          </pre>
        </div>
      </div>
    </ThemeProvider>
  );
};

const meta = {
  title: 'Theme/Generator',
  component: ThemeGenerator,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    primaryColor: { control: 'color' },
    secondaryColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    userBubbleBackground: { control: 'color' },
    assistantBubbleBackground: { control: 'color' },
    userBubbleText: { control: 'color' },
    assistantBubbleText: { control: 'color' },
    fontFamily: { control: 'text' },
    borderRadiusSm: { control: 'text' },
    borderRadiusMd: { control: 'text' },
    borderRadiusLg: { control: 'text' },
    spacingSm: { control: 'text' },
    spacingMd: { control: 'text' },
    fontSizeSmall: { control: 'text' },
    fontSizeMedium: { control: 'text' },
    fontSizeLarge: { control: 'text' },
  }
} satisfies Meta<typeof ThemeGenerator>;

export default meta;


