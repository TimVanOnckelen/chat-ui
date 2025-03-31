import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';
import { ModelSelector } from '../ModelSelector/ModelSelector';
import { FileSelector } from '../FileSelector/FileSelector';
import { SelectedFiles } from '../SelectedFiles/SelectedFiles';
import { useState } from 'react';

const meta = {
  title: 'Chat/ChatInput',
  component: ChatInput,
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
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample models for ModelSelector
const models = [
  { id: 'gpt-4', name: 'GPT-4o', description: 'Most capable model, best for complex tasks' },
  { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Faster, cheaper, good for most tasks' },
  { id: 'claude-2', name: 'Claude 3.5', description: 'Alternative model with different strengths' },
];

// Sample files for the SelectedFiles story
const sampleFiles = [
  {
    id: '1',
    name: 'documentation.pdf',
    size: 2500000,
    type: 'application/pdf',
  },
  {
    id: '2',
    name: 'screenshot.png',
    size: 1200000,
    type: 'image/png',
  },
];

export const Default: Story = {
  args: {
    onSubmit: (message) => console.log('Message submitted:', message),
  },
};

export const WithModelSelector: Story = {
  args: {
    onSubmit: (message) => console.log('Message submitted:', message),
    beforeInput: (
      <ModelSelector
        models={models}
        selectedModel="gpt-4"
        onModelChange={(modelId) => console.log('Model changed:', modelId)}
      />
    ),
  },
};

export const WithFileSelector: Story = {
  args: {
    onSubmit: (message) => console.log('Message submitted:', message),
    afterInput: (
      <FileSelector
        onFilesSelected={(files) => console.log('Files selected:', files)}
        accept=".txt,.pdf,.doc,.docx"
        maxSize={5 * 1024 * 1024} // 5MB
      />
    ),
  },
};

export const WithBothSelectors: Story = {
  args: {
    onSubmit: (message) => console.log('Message submitted:', message),
    beforeInput: (
      <ModelSelector
        models={models}
        selectedModel="gpt-4"
        onModelChange={(modelId) => console.log('Model changed:', modelId)}
      />
    ),
    afterInput: (
      <FileSelector
        onFilesSelected={(files) => console.log('Files selected:', files)}
        accept=".txt,.pdf,.doc,.docx"
        maxSize={5 * 1024 * 1024} // 5MB
      />
    ),
  },
};

// Interactive story with selected files
const WithSelectedFilesTemplate = () => {
  const [selectedFiles, setSelectedFiles] = useState(sampleFiles);

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles(files => files.filter(f => f.id !== fileId));
  };

  const handleAddFiles = (newFiles: File[]) => {
    const filesToAdd = newFiles.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setSelectedFiles(files => [...files, ...filesToAdd]);
  };

  return (
    <ChatInput
      onSubmit={(message) => console.log('Message submitted:', message)}
      beforeInput={
        <SelectedFiles
          files={selectedFiles}
          onRemoveFile={handleRemoveFile}
        />
      }
      afterInput={
        <FileSelector
          onFilesSelected={handleAddFiles}
          accept=".txt,.pdf,.doc,.docx,image/*"
          maxSize={5 * 1024 * 1024}
        />
      }
    />
  );
};

export const WithSelectedFiles: Story = {
  args: {
    onSubmit: (message) => console.log('Message submitted:', message),
  },
  render: WithSelectedFilesTemplate,
};

export const Disabled: Story = {
  args: {
    onSubmit: (message) => console.log('Message submitted:', message),
    disabled: true,
    beforeInput: (
      <ModelSelector
        models={models}
        selectedModel="gpt-4"
        onModelChange={(modelId) => console.log('Model changed:', modelId)}
        disabled
      />
    ),
    afterInput: (
      <FileSelector
        onFilesSelected={(files) => console.log('Files selected:', files)}
        accept=".txt,.pdf,.doc,.docx"
        disabled
      />
    ),
  },
};