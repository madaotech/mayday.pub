import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      extend: {
        boxShadow: {
          highlight: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        },
        screens: {
          narrow: { raw: '(max-aspect-ratio: 3 / 2)' },
          wide: { raw: '(min-aspect-ratio: 3 / 2)' },
          'taller-than-854': { raw: '(min-height: 854px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
