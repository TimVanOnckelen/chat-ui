import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContextList } from '../ContextList';
import { ThemeProvider } from '../../../theme/ThemeProvider';

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider initialTheme="default">
      {component}
    </ThemeProvider>
  );
};

describe('ContextList', () => {
  const sampleItems = [
    {
      title: 'Test Title 1',
      content: 'Test Content 1',
      confidence: 0.95,
      source: 'test/file1.ts'
    },
    {
      title: 'Test Title 2',
      content: 'Test Content 2',
      confidence: 0.85,
      source: 'test/file2.ts'
    }
  ];

  it('renders all items correctly', () => {
    renderWithTheme(<ContextList items={sampleItems} />);
    
    // Check titles
    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    
    // Check content
    expect(screen.getByText('Test Content 1')).toBeInTheDocument();
    expect(screen.getByText('Test Content 2')).toBeInTheDocument();
    
    // Check sources
    expect(screen.getByText('test/file1.ts')).toBeInTheDocument();
    expect(screen.getByText('test/file2.ts')).toBeInTheDocument();
    
    // Check confidence scores
    expect(screen.getByText('95% match')).toBeInTheDocument();
    expect(screen.getByText('85% match')).toBeInTheDocument();
  });

  it('respects maxItems prop', () => {
    const manyItems = [...sampleItems, {
      title: 'Test Title 3',
      content: 'Test Content 3',
      confidence: 0.75,
      source: 'test/file3.ts'
    }];

    renderWithTheme(<ContextList items={manyItems} maxItems={2} />);
    
    // Should show first two items
    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    
    // Third item should not be shown
    expect(screen.queryByText('Test Title 3')).not.toBeInTheDocument();
    
    // Should show remaining count
    expect(screen.getByText('+1 more sources')).toBeInTheDocument();
  });

  it('renders without confidence scores', () => {
    const itemsWithoutConfidence = sampleItems.map(({ confidence, ...item }) => item);
    renderWithTheme(<ContextList items={itemsWithoutConfidence} />);
    
    expect(screen.queryByText('95% match')).not.toBeInTheDocument();
    expect(screen.queryByText('85% match')).not.toBeInTheDocument();
  });

  it('renders without sources', () => {
    const itemsWithoutSources = sampleItems.map(({ source, ...item }) => item);
    renderWithTheme(<ContextList items={itemsWithoutSources} />);
    
    expect(screen.queryByText('test/file1.ts')).not.toBeInTheDocument();
    expect(screen.queryByText('test/file2.ts')).not.toBeInTheDocument();
  });

  it('renders with icon', () => {
    const icon = <svg data-testid="test-icon" />;
    const { container } = renderWithTheme(<ContextList items={sampleItems} icon={icon} />);
    
    expect(container.querySelector('[data-testid="test-icon"]')).toBeInTheDocument();
  });

  it('starts expanded by default', () => {
    renderWithTheme(<ContextList items={sampleItems} />);
    
    // Content should be visible
    expect(screen.getByText('Test Content 1')).toBeVisible();
    expect(screen.getByText('Test Content 2')).toBeVisible();
  });

  it('starts collapsed when defaultCollapsed is true', () => {
    renderWithTheme(<ContextList items={sampleItems} defaultCollapsed={true} />);
    
    // Content should exist but not be visible
    const content1 = screen.getByText('Test Content 1');
    const content2 = screen.getByText('Test Content 2');
    
    expect(content1.closest('div')).toHaveStyle({
      height: '0',
      opacity: '0'
    });
  });

  it('toggles collapse state on click', async () => {
    const { container } = renderWithTheme(<ContextList items={sampleItems} />);
    
    // Get the header element
    const header = container.querySelector('[role="button"]');
    expect(header).toBeInTheDocument();
    
    // Initially expanded
    const contentContainer = screen.getByText('Test Content 1').closest('div');
    expect(contentContainer).toHaveStyle({ opacity: '1' });
    
    // Click to collapse
    if (header) {
      (header as HTMLElement).click();
    }
    expect(contentContainer).toHaveStyle({ opacity: '0' });
    
    // Click to expand
    if (header) {
      (header as HTMLElement).click();
    }
    expect(contentContainer).toHaveStyle({ opacity: '1' });
  });
});