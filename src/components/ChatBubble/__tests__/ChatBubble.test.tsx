import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatBubble } from '../ChatBubble';
import { ThemeProvider } from '../../../theme/ThemeProvider';

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
});