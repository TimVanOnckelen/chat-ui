import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';
import { FileSelector } from '../FileSelector/FileSelector';
import { SelectedFiles } from '../SelectedFiles/SelectedFiles';
import { AIProcessingIndicator } from '../AIProcessingIndicator/AIProcessingIndicator';
import { useState } from 'react';

const meta = {
  title: 'Chat/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (message: string) => console.log('Message:', message),
  },
};

export const Disabled: Story = {
  args: {
    onSubmit: (message: string) => console.log('Message:', message),
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    onSubmit: (message: string) => console.log('Message:', message),
    placeholder: 'Ask me anything...',
  },
};

// Interactive story showing file upload integration
const WithFileUploadComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState<Array<{ id: string; name: string; size: number; type: string }>>([]);
  
  const handleFileSelect = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <ChatInput
      onSubmit={(message) => console.log('Message with files:', message, selectedFiles)}
      afterInput={
        <FileSelector
          onFilesSelected={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024}
        />
      }
      beforeInput={
        selectedFiles.length > 0 && (
          <SelectedFiles
            files={selectedFiles}
            onRemoveFile={(id) => setSelectedFiles(prev => prev.filter(f => f.id !== id))}
          />
        )
      }
    />
  );
};

export const WithFileUpload: StoryObj<typeof ChatInput> = {
  render: WithFileUploadComponent,
  args: {},
};

// Interactive story showing AI processing state
const WithProcessingComponent = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate AI processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 0.9) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setProgress(0);
          }, 500);
          return 1;
        }
        return prev + 0.1;
      });
    }, 300);
  };

  return (
    <ChatInput
      onSubmit={handleSubmit}
      disabled={isProcessing}
      progressIndicator={
        isProcessing && (
          <AIProcessingIndicator
            showProgress
            progress={progress}
            text="AI is thinking..."
          />
        )
      }
    />
  );
};

export const WithProcessingIndicator: StoryObj<typeof ChatInput> = {
  render: WithProcessingComponent,
  args: {},
};

// Story combining multiple features
const FullFeaturedComponent = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<Array<{ id: string; name: string; size: number; type: string }>>([]);

  const handleSubmit = (message: string) => {
    setIsProcessing(true);
    setProgress(0);
    console.log('Submitting message with files:', message, selectedFiles);
    
    // Simulate AI processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 0.9) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setProgress(0);
          }, 500);
          return 1;
        }
        return prev + 0.1;
      });
    }, 300);
  };

  const handleFileSelect = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  return (
    <ChatInput
      onSubmit={handleSubmit}
      disabled={isProcessing}
      placeholder="Send a message or upload files..."
      afterInput={
        <FileSelector
          onFilesSelected={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024}
          disabled={isProcessing}
        />
      }
      beforeInput={
        selectedFiles.length > 0 && (
          <SelectedFiles
            files={selectedFiles}
            onRemoveFile={(id) => setSelectedFiles(prev => prev.filter(f => f.id !== id))}
          />
        )
      }
      progressIndicator={
        isProcessing && (
          <AIProcessingIndicator
            showProgress
            progress={progress}
            text="AI is thinking..."
          />
        )
      }
    />
  );
};

export const FullFeatured: StoryObj<typeof ChatInput> = {
  render: FullFeaturedComponent,
  args: {},
};
