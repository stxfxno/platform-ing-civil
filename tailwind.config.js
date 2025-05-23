/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Corregido: era "./src/*/.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#1a365d',
          600: '#164a63',
          700: '#0f3d56',
          800: '#0c2d42',
          900: '#0a1f2e',
        },
        secondary: {
          500: '#2d4a5a',
          600: '#253e4a',
          700: '#1d323a',
          800: '#15262a',
          900: '#0d1a1a',
        },
        accent: {
          500: '#c05621',
          600: '#a84818',
          700: '#8f3a0f',
          800: '#762c06',
          900: '#5d1e00',
        },
        success: {
          500: '#1a7f37',
          600: '#166b2d',
          700: '#125623',
          800: '#0e4219',
          900: '#0a2d0f',
        },
        warning: {
          500: '#d97706',
          600: '#b86105',
          700: '#974b04',
          800: '#763503',
          900: '#551f02',
        },
        danger: {
          500: '#b91c1c',
          600: '#9f1717',
          700: '#851212',
          800: '#6b0d0d',
          900: '#510808',
        }
      }
    },
  },
  plugins: [],
}