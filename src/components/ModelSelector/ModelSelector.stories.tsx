import type { Meta, StoryObj } from '@storybook/react';
import { ModelSelector } from './ModelSelector';

const meta = {
  title: 'Chat/ModelSelector',
  component: ModelSelector,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '200px', margin: '200px auto 0' }}>
        <Story />
      </div>
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
    id: 'fruit', 
    name: 'fruit Theme', 
    description: 'iOS-style messaging interface'
  },
  { 
    id: 'skylight', 
    name: 'skylight Theme', 
    description: 'Microsoft skylight design system'
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
    models: defaultModels.map(({ ...model }) => model),
    selectedModel: 'fruit',
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