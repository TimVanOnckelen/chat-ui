import type { Meta, StoryObj } from '@storybook/react';
import { AIProcessingIndicator } from './AIProcessingIndicator';

const meta = {
  title: 'Chat/AIProcessingIndicator',
  component: AIProcessingIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
        <Story />
    ),
  ],
} satisfies Meta<typeof AIProcessingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    text: 'AI is thinking...',
  },
};

export const ProgressBar: Story = {
  args: {
    text: 'Processing request',
    showProgress: true,
    progress: 0.8,
  },
};

export const ProgressBarStarting: Story = {
  args: {
    text: 'Starting process',
    showProgress: true,
    progress: 0.1,
  },
};

export const ProgressBarAlmostDone: Story = {
  args: {
    text: 'Almost done',
    showProgress: true,
    progress: 0.95,
  },
};

export const LargerDots: Story = {
  args: {
    dotSize: 6,
    text: 'Processing your request',
  },
};

export const NoText: Story = {
  args: {
    text: '',
    showProgress: true,
    progress: 0.6,
  },
};

export const WideProgressBar: Story = {
  args: {
    text: 'Processing',
    showProgress: true,
    progress: 0.6,
    progressWidth: 120,
    progressHeight: 4,
  },
};

export const TallProgressBar: Story = {
  args: {
    text: 'Processing',
    showProgress: true,
    progress: 0.7,
    progressWidth: 60,
    progressHeight: 8,
  },
};

export const LargeProgressBar: Story = {
  args: {
    text: 'Processing large file',
    showProgress: true,
    progress: 0.4,
    progressWidth: 200,
    progressHeight: 12,
  },
};