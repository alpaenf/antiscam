import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Poppins', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          subtle: '#FAFAFA',
          muted: '#F3F4F6',
          dark: '#111827',
        },
        foreground: {
          DEFAULT: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
          inverse: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E7EB',
          subtle: '#F3F4F6',
          focus: '#111827',
        },
        risk: {
          low: {
            text: '#16A34A',
            bg: '#F0FDF4',
            border: '#BBF7D0',
            badge: '#DCFCE7',
          },
          medium: {
            text: '#D97706',
            bg: '#FFFBEB',
            border: '#FDE68A',
            badge: '#FEF3C7',
          },
          high: {
            text: '#EA580C',
            bg: '#FFF7ED',
            border: '#FED7AA',
            badge: '#FFEDD5',
          },
          critical: {
            text: '#DC2626',
            bg: '#FEF2F2',
            border: '#FECACA',
            badge: '#FEE2E2',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
