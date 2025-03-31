import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatBubble } from '../ChatBubble';
import { ThemeProvider } from '../../../theme/ThemeProvider';
import { fruitTheme } from '../../../theme/theme.types';

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider initialTheme="default">
      {component}
    </ThemeProvider>
  );
};

describe('ChatBubble', () => {
  it('renders message content correctly', () => {
    const message = 'Hello, world!';
    renderWithTheme(<ChatBubble message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('displays timestamp when provided', () => {
    const timestamp = '12:30 PM';
    renderWithTheme(<ChatBubble message="Test message" timestamp={timestamp} />);
    expect(screen.getByText(timestamp)).toBeInTheDocument();
  });

  it('renders extra content when provided', () => {
    const extraContent = 'GPT-4';
    renderWithTheme(
      <ChatBubble 
        message="Test message" 
        extraContent={<span>{extraContent}</span>} 
      />
    );
    expect(screen.getByText(extraContent)).toBeInTheDocument();
  });

  it('applies user message styling', () => {
    const { container } = renderWithTheme(
      <ChatBubble message="User message" isUser={true} />
    );
    const bubble = container.firstChild;
    expect(bubble).toHaveStyle({
      marginLeft: 'auto'
    });
  });

  it('applies assistant message styling', () => {
    const { container } = renderWithTheme(
      <ChatBubble message="Assistant message" isUser={false} />
    );
    const bubble = container.firstChild;
    expect(bubble).toHaveStyle({
      marginRight: 'auto'
    });
  });

  it('updates styling when theme changes', () => {
    const { rerender, container } = renderWithTheme(
      <ChatBubble message="Test message" isUser={true} />
    );

    const bubble = container.firstChild as HTMLElement;
    const defaultBackground = window.getComputedStyle(bubble).backgroundColor;

    rerender(
      <ThemeProvider initialTheme="fruit">
        <ChatBubble message="Test message" isUser={true} />
      </ThemeProvider>
    );

    expect(bubble).toHaveStyle({
      backgroundColor: fruitTheme.colors.userBubbleBackground
    });
    expect(window.getComputedStyle(bubble).backgroundColor).not.toBe(defaultBackground);
  });

  it('applies custom theme correctly', () => {
    const customTheme = {
      colors: {
        userBubbleBackground: '#FF0000',
        userBubbleText: '#FFFFFF'
      }
    };

    const { container } = render(
      <ThemeProvider initialTheme={customTheme}>
        <ChatBubble message="Test message" isUser={true} />
      </ThemeProvider>
    );

    const bubble = container.firstChild as HTMLElement;
    expect(bubble).toHaveStyle({
      backgroundColor: '#FF0000',
      color: '#FFFFFF'
    });
  });
});