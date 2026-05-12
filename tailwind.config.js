<<<<<<< HEAD
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
=======
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
>>>>>>> f01f5af25f7598d1f376b5b8986af3edba8fb80c
  ],
  // Disable preflight — the project ships its own CSS reset in index.css
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        'grey-50':  '#f7f7f7',
        'grey-100': '#efeeec',
        'grey-150': '#e9e9e9',
        'grey-200': '#bebebe',
        'grey-300': '#6a6a6a',
        'grey-400': '#282828',
        'grey-500': '#1f1f1f',
        'grey-600': '#1a1a1a',
        'grey-800': '#121212',
        'grey-900': '#111212',
        mint:       '#b2f6e3',
      },
      fontFamily: {
        // Used as font-sans-primary in JSX and via --font-sans-primary CSS var
        'sans-primary': ['"saans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Below entries OVERRIDE Tailwind defaults to match the original design tokens
        '2xs':   ['0.5rem',    { lineHeight: '1' }],
        '1xs':   ['0.675rem',  { lineHeight: '1' }],
        '5xl':   ['3.125rem',  { lineHeight: '1' }],
        '6xl':   ['3.75rem',   { lineHeight: '1' }],
        '7xl':   ['4.6875rem', { lineHeight: '1' }],
        '7.5xl': ['5.625rem',  { lineHeight: '0.9' }],
        '8xl':   ['6.25rem',   { lineHeight: '1' }],
        '8.5xl': ['7.5rem',    { lineHeight: '0.9' }],
        '9.5xl': ['10.5rem',   { lineHeight: '0.9' }],
        '10xl':  ['13.75rem',  { lineHeight: '0.9' }],
      },
      height: {
        '18': '4.5rem',
        '22': '5.5rem',
        // Dynamic viewport height fix — set by JS on mount + resize
        'screen-fix':     'calc(var(--vh, 1vh) * 100)',
        'screen-fix-110': 'calc(var(--vh, 1vh) * 110)',
      },
      lineHeight: {
        '0.9': '0.9',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      // Generates .aspect-20\/9, .aspect-4\/3, .aspect-1\/1 via JIT
      aspectRatio: {
        '20/9': '20 / 9',
        '4/3':  '4 / 3',
        '1/1':  '1 / 1',
      },
      letterSpacing: {
        tightish: '-0.025em',
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
      },

    },
  },
  plugins: [
    // Adds pointer-fine: variant — mirrors @media (pointer: fine) used throughout the original
    plugin(function ({ addVariant }) {
      addVariant('pointer-fine', '@media (pointer: fine)');
    }),
  ],
};
