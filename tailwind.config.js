/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ADD8E6',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        }
      },
      fontFamily: {
        body: ['Nunito']
      }
    }
  },
  plugins: [],
}

