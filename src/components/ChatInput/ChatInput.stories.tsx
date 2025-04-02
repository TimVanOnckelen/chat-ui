import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';
import { ModelSelector } from '../ModelSelector/ModelSelector';
import { FileSelector } from '../FileSelector/FileSelector';
import { SelectedFiles } from '../SelectedFiles/SelectedFiles';
import { useState } from 'react';
import { AIProcessingIndicator } from '../AIProcessingIndicator/AIProcessingIndicator';

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

export const WithAttachmentIcon: Story = {
  args: {
    onSubmit: (message) => console.log('Message submitted:', message),
    afterInput: (
      <button
        style={{
          background: 'none',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: 'inherit',
          opacity: 0.7,
        }}
        onClick={() => console.log('Attachment clicked')}
      >
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
      </button>
    )
  },
};

export const WithProgressIndicator: Story = {
  args: {
    onSubmit: (message) => console.log('Message submitted:', message),
    placeholder: "AI is processing your last message...",
    disabled: true,
    progressIndicator: (
      <div style={{ 
        position: 'absolute',
        bottom: '-4px',
        left: 0,
        right: 0,
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        overflow: 'hidden'
      }}>
        <AIProcessingIndicator 
          text="" 
          showProgress 
          progress={0.6}
          progressWidth="100%"
          progressHeight={3}
        />
      </div>
    )
  },
};