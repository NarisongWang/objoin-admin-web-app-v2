/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      display: ['Oswald'],
      body: ['"Open Sans"'],
    },
    extend: {},
    screens: {
      xs: '380px',
      sm: '640px',
      md: '768px',
      lg: '1080px',
      xl: '1280px',
    },
  },
  plugins: [],
};
