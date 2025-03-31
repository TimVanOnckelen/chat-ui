import type { Meta, StoryObj } from '@storybook/react';
import { ModelSelector } from './ModelSelector';
import { ThemeProvider } from '../../theme/ThemeProvider';

const meta = {
  title: 'Chat/ModelSelector',
  component: ModelSelector,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '200px', margin: '200px auto 0' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ModelSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultModels = [
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

export const Default: Story = {
  args: {
    models: defaultModels,
    selectedModel: 'default',
    onModelChange: (modelId) => console.log('Theme changed:', modelId),
  },
};

export const WithoutDescriptions: Story = {
  args: {
    models: defaultModels.map(({ description, ...model }) => model),
    selectedModel: 'apple',
    onModelChange: (modelId) => console.log('Theme changed:', modelId),
  },
};

export const Disabled: Story = {
  args: {
    models: defaultModels,
    selectedModel: 'default',
    onModelChange: (modelId) => console.log('Theme changed:', modelId),
    disabled: true,
  },
};