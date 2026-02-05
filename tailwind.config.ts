import type { Config } from 'tailwindcss'

import { heroui } from '@heroui/theme'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@heroui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}

export default config
