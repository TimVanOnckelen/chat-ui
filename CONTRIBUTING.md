# Contributing to Chat UI

Thanks for your interest in contributing to Chat UI! This guide will help you get started with contributing to our React component library.

## Development Setup

1. **Prerequisites**
   - Node.js (latest LTS version)
   - npm or yarn
   - Git

2. **Local Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/TimVanOnckelen/chat-ui.git
   cd chat-ui

   # Install dependencies
   npm install

   # Start Storybook for development
   npm run storybook
   ```

## Development Workflow

### 1. Component Development

Each component should:
- Live in its own directory under `src/components/`
- Include the following files:
  ```
  ComponentName/
  ├── ComponentName.tsx
  ├── ComponentName.stories.tsx
  ├── __tests__/
  │   └── ComponentName.test.tsx
  ```

### 2. TypeScript Guidelines

- Use TypeScript for all new code
- Define proper interfaces for props
- Include JSDoc comments for props
- Export interfaces that might be useful to consumers

Example:
```tsx
export interface ButtonProps {
  /** Primary button style */
  primary?: boolean;
  /** Button label content */
  label: string;
  /** Click handler */
  onClick?: () => void;
}
```

### 3. Theming

- Use the `useTheme` hook for styling
- Follow the theme token structure
- Support all built-in themes (Default, Fruit, Skylight)
- Test components with different themes

### 4. Testing

We use Vitest and React Testing Library. All components should have tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:ui
```

Test files should cover:
- Component rendering
- User interactions
- Theme variations
- Edge cases

### 5. Documentation

Each component needs:
- Storybook stories demonstrating all features
- JSDoc comments for props and methods
- Usage examples in stories
- Theme customization examples

### 6. Pull Request Process

1. **Branch Naming**
   - feature/feature-name
   - fix/bug-description
   - docs/documentation-update

2. **Before Submitting**
   - Run tests (`npm test`)
   - Run linter (`npm run lint`)
   - Update documentation if needed
   - Add/update tests as needed
   - Ensure Storybook stories work

3. **PR Description**
   - Describe the changes
   - Link related issues
   - Include screenshots for UI changes
   - List breaking changes if any

### 7. Code Style

We use ESLint with TypeScript support. Follow these guidelines:

- Use functional components with hooks
- Prefer const over let
- Use TypeScript's strict mode
- Follow React best practices
- Use consistent naming:
  - Components: PascalCase
  - Files: PascalCase
  - Variables/functions: camelCase
  - Constants: UPPER_CASE

### 8. Component Guidelines

Components should:
- Be fully typed with TypeScript
- Use theme tokens for styling
- Support keyboard navigation
- Be accessible (ARIA attributes)
- Handle loading/error states
- Be responsive
- Support common use cases
- Have clear prop interfaces

Example structure:
```tsx
import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({
  // Component implementation
}) => {
  const { theme } = useTheme();
  // Implementation
};
```

### 9. Storybook

Each component needs stories for:
- Default state
- All prop variations
- Interactive examples
- Theme variations
- Edge cases
- Error states

### 10. Performance

Consider:
- Memoization when needed
- Proper dependencies in hooks
- Bundle size impact
- Render optimizations
- Browser compatibility

## Getting Help

- Open an issue for bugs
- Use discussions for questions
- Join our Discord community
- Tag maintainers for urgent issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Chat UI! 🎉