/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Jeju Myeongjo', 'serif'],
        'sans': ['Jeju Myeongjo', 'sans-serif'],
        'mono': ['Jeju Myeongjo', 'monospace'],
      },
    },
  },
  plugins: [
    require('lightswind/plugin'),],
}

