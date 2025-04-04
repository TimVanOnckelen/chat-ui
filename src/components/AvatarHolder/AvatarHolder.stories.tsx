import type { Meta, StoryObj } from '@storybook/react';
import { AvatarHolder } from './AvatarHolder';

const meta = {
  title: 'Chat/AvatarHolder',
  component: AvatarHolder,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarHolder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    text: 'Tim van Osch',
    size: 40,
  },
};

export const WithImage: Story = {
  args: {
    image: 'https://github.com/github.png',
    size: 40,
  },
};

export const Large: Story = {
  args: {
    text: 'John Doe',
    size: 64,
  },
};

export const Small: Story = {
  args: {
    text: 'AI',
    size: 24,
  },
};

export const CustomColors: Story = {
  args: {
    text: 'Custom',
    backgroundColor: '#6366f1',
    textColor: '#ffffff',
    size: 40,
  },
};