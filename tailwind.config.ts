import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        forest: { DEFAULT: '#173D32', 50: '#F1F5F1', 100: '#DCE6D8', 200: '#BBD0B6', 300: '#8FAE8B', 600: '#244F40', 700: '#1B4235', 900: '#122F27' },
        ink: '#303632',
        cream: { DEFAULT: '#F6F4EC', deep: '#EDE9DC', light: '#FBF9F3' },
        olive: '#DCE6D8',
        gold: { DEFAULT: '#C5A66B', light: '#E4D5B7', deep: '#A78A50' },
        muted: '#858C84',
        line: '#DFDDD2',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Microsoft YaHei"', '"Noto Sans CJK SC"', '"Source Han Sans SC"', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', '"Songti SC"', '"STSong"', '"Noto Serif CJK SC"', '"Source Han Serif SC"', '"SimSun"', 'serif'],
        display: ['Georgia', '"Songti SC"', '"STSong"', 'serif'],
      },
      fontSize: {
        'display-sm': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'display': ['2.6rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'display-xl': ['4.25rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        soft: '0 2px 16px rgba(23, 61, 50, 0.06)',
        card: '0 8px 32px rgba(23, 61, 50, 0.08)',
        lift: '0 16px 48px rgba(23, 61, 50, 0.12)',
      },
      borderRadius: { xl: '0.75rem', '2xl': '1.25rem' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.9s ease-out both',
      },
      typography: () => ({
        longevity: {
          css: {
            '--tw-prose-body': '#303632',
            '--tw-prose-headings': '#173D32',
            '--tw-prose-links': '#244F40',
            '--tw-prose-bold': '#173D32',
            '--tw-prose-quotes': '#244F40',
            '--tw-prose-hr': '#DFDDD2',
            '--tw-prose-th-borders': '#DFDDD2',
            '--tw-prose-td-borders': '#DFDDD2',
            maxWidth: '72ch',
            fontSize: '1.0625rem',
            lineHeight: '1.9',
            'h2, h3': { fontFamily: 'Georgia, "Songti SC", "STSong", serif', letterSpacing: '-0.01em' },
            a: { textDecorationThickness: '1px', textUnderlineOffset: '3px' },
            blockquote: { borderLeftColor: '#C5A66B', backgroundColor: '#F6F4EC', padding: '0.75rem 1.25rem', fontStyle: 'normal', borderRadius: '0 0.5rem 0.5rem 0' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
