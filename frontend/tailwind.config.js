/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#10263f',
          800: '#183a5c',
        },
        blue: {
          600: '#2f6cf4',
          500: '#4a7df4',
          100: '#eaf1ff',
        },
        sky: '#f0f7ff',
        coral: {
          500: '#f06a5b',
          100: '#fff0ec',
        },
        green: '#2a9d72',
        cream: '#fbfaf6',
        white: '#fff',
        text: '#1d3145',
        muted: '#6d7c8a',
        line: '#dfe7ec',
      },
      boxShadow: {
        default: '0 22px 60px rgba(16, 38, 63, .1)',
      },
      borderRadius: {
        DEFAULT: '24px',
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', '"Noto Sans KR"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
