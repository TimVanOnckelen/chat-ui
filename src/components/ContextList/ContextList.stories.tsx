import type { Meta, StoryObj } from '@storybook/react';
import { ContextList } from './ContextList';

const LightbulbIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const sampleContextItems = [
  {
    title: 'Function Documentation',
    content: 'The calculateTotal function accepts an array of numbers and returns their sum with optional tax calculation.',
    confidence: 0.95,
    source: 'utils/calculations.ts:15'
  },
  {
    title: 'Type Definition',
    content: 'interface OrderItem { id: string; price: number; quantity: number; }',
    confidence: 0.85,
    source: 'types/order.ts:23'
  },
  {
    title: 'Usage Example',
    content: 'items.map(item => calculateTotal(item.prices, { includeTax: true }))',
    confidence: 0.75,
    source: 'components/OrderSummary.tsx:42'
  },
  {
    title: 'Test Case',
    content: 'it("should calculate total with tax", () => { expect(calculateTotal([10, 20], { includeTax: true })).toBe(33) })',
    confidence: 0.65,
    source: 'tests/calculations.test.ts:28'
  }
];

const meta = {
  title: 'Chat/ContextList',
  component: ContextList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleContextItems.slice(0, 2),
  },
};

export const WithIcon: Story = {
  args: {
    items: sampleContextItems.slice(0, 2),
    icon: <LightbulbIcon />
  },
};

export const WithMaxItems: Story = {
  args: {
    items: sampleContextItems,
    maxItems: 2,
    icon: <LightbulbIcon />
  },
};

export const WithoutConfidence: Story = {
  args: {
    items: sampleContextItems.slice(0, 2).map(({ ...item }) => item),
    icon: <LightbulbIcon />
  },
};

export const WithoutSource: Story = {
  args: {
    items: sampleContextItems.slice(0, 2).map(({  ...item }) => item),
    icon: <LightbulbIcon />
  },
};

export const Collapsed: Story = {
  args: {
    items: sampleContextItems,
    icon: <LightbulbIcon />,
    defaultCollapsed: true
  },
};