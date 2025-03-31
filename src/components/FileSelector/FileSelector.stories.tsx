import type { Meta, StoryObj } from '@storybook/react';
import { FileSelector } from './FileSelector';
import { ThemeProvider } from '../../theme/ThemeProvider';

const meta = {
  title: 'Chat/FileSelector',
  component: FileSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '200px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof FileSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
  },
};

export const ImagesOnly: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

export const MultipleFiles: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    maxFiles: 3,
    accept: '.pdf,.doc,.docx,.txt',
  },
};

export const WithSizeLimit: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    maxSize: 1024 * 1024, // 1MB
    accept: '.pdf,.txt',
  },
};

export const Disabled: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    disabled: true,
  },
};