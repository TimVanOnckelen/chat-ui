import type { Meta, StoryObj } from '@storybook/react';
import { FileSelector } from './FileSelector';

const meta = {
  title: 'Chat/FileSelector',
  component: FileSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    buttonText: 'Attach File',
  },
};

export const CustomIcon: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    buttonText: 'Upload',
    icon: (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M14 10v2.67A1.33 1.33 0 0 1 12.67 14H3.33A1.33 1.33 0 0 1 2 12.67V10"/>
        <path d="M11.33 5.33 8 2l-3.33 3.33"/>
        <path d="M8 2v8"/>
      </svg>
    ),
  },
};

export const IconRight: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    buttonText: 'Choose Files',
    iconPosition: 'right',
  },
};

export const ImagesOnly: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
    buttonText: 'Upload Images',
  },
};

export const MultipleFiles: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    maxFiles: 3,
    accept: '.pdf,.doc,.docx,.txt',
    buttonText: 'Add Documents',
  },
};

export const WithSizeLimit: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    maxSize: 1024 * 1024, // 1MB
    accept: '.pdf,.txt',
    buttonText: 'Upload (Max 1MB)',
  },
};

export const Disabled: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    disabled: true,
    buttonText: 'Upload Disabled',
  },
};

export const IconOnly: Story = {
  args: {
    onFilesSelected: (files) => console.log('Files selected:', files),
    buttonText: '',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </svg>
    )
  },
};