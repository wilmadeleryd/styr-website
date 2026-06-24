/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          primary: '#006666',
          deep: '#004444',
          tint: '#f0f7f7',
        },
        cream: '#f5f0e8',
        brand: {
          text: '#111111',
          muted: '#555555',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.12em',
      },
    },
  },
  plugins: [],
}
