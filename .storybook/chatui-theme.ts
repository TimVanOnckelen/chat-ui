import { create } from '@storybook/theming';

const logo = `
<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="200" fill="white"/>
  <path d="M30 40 h200 a10 10 0 0 1 10 10 v80 a10 10 0 0 1 -10 10 h-90 l-25 20 v-20 h-85 a10 10 0 0 1 -10 -10 v-80 a10 10 0 0 1 10 -10 z" fill="#3B82F6"/>
  <text x="50" y="80" font-family="Arial, sans-serif" font-size="28" fill="white" font-weight="bold">ChatUI</text>
  <g transform="translate(180, 95)">
    <rect x="-15" y="-15" width="30" height="30" rx="6" fill="#10B981"/>
    <circle cx="-7" cy="-5" r="3" fill="white"/>
    <circle cx="7" cy="-5" r="3" fill="white"/>
    <rect x="-5" y="5" width="10" height="3" rx="1.5" fill="white"/>
    <line x1="0" y1="-20" x2="0" y2="-15" stroke="#10B981" stroke-width="2"/>
    <circle cx="0" cy="-22" r="2" fill="#10B981"/>
  </g>
</svg>

`;

// Convert SVG to data URL
const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(logo)}`;

export default create({
  base: 'light',
  brandTitle: 'ChatKit',
  brandUrl: 'https://timvanonckelen.github.io/chatkit-react',
  brandImage: svgDataUrl,
  brandTarget: '_self',
});