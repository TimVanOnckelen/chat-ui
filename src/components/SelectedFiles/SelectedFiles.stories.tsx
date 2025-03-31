import type { Meta, StoryObj } from '@storybook/react';
import { SelectedFiles } from './SelectedFiles';

const meta = {
  title: 'Chat/SelectedFiles',
  component: SelectedFiles,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
        <div style={{ width: '600px', margin: '0 auto' }}>
          <Story />
        </div>
    ),
  ],
} satisfies Meta<typeof SelectedFiles>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFiles = [
  {
    id: '1',
    name: 'document.pdf',
    size: 2500000,
    type: 'application/pdf',
  },
  {
    id: '2',
    name: 'image.png',
    size: 1200000,
    type: 'image/png',
  },
  {
    id: '3',
    name: 'very-long-filename-that-should-be-truncated-with-ellipsis.txt',
    size: 5000,
    type: 'text/plain',
  },
];

export const Default: Story = {
  args: {
    files: sampleFiles,
    onRemoveFile: (fileId) => console.log('Remove file:', fileId),
  },
};

export const SingleFile: Story = {
  args: {
    files: [sampleFiles[0]],
    onRemoveFile: (fileId) => console.log('Remove file:', fileId),
  },
};

export const ManyFiles: Story = {
  args: {
    files: [
      ...sampleFiles,
      {
        id: '4',
        name: 'data.json',
        size: 750000,
        type: 'application/json',
      },
      {
        id: '5',
        name: 'screenshot.jpg',
        size: 3500000,
        type: 'image/jpeg',
      },
    ],
    onRemoveFile: (fileId) => console.log('Remove file:', fileId),
  },
};

export const EmptyState: Story = {
  args: {
    files: [],
    onRemoveFile: (fileId) => console.log('Remove file:', fileId),
  },
};