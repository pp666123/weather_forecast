import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },   
      boxShadow: {
        'inner-1': 'inset -7px 0px 30px -7px rgba(0,0,0,0.4)',
        'inner-2': 'inset 7px 0 30px -7px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
export default config
