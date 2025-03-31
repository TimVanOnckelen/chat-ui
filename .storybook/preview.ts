import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      return React.createElement(
        ThemeProvider,
        {
          initialTheme: context.globals.theme,
          children: React.createElement(Story)
        }
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'default', icon: 'circlehollow', title: 'Default Theme' },
          { value: 'apple', icon: 'circle', title: 'Apple Theme' },
          { value: 'fluent', icon: 'circle', title: 'Fluent Theme' },
          { value: 'forest', icon: 'circle', title: 'Forest Theme' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;