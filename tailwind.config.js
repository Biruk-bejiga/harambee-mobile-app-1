const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#9F7AEA',
          DEFAULT: '#7C3AED',
          dark: '#4C1D95'
        },
        midnight: '#0F172A',
        ash: '#1E293B',
        accent: '#22D3EE'
      },
      fontFamily: {
        display: ['"Nunito"', 'System'],
        body: ['"Inter"', 'System']
      },
      boxShadow: {
        card: '0 16px 30px rgba(15,23,42,0.35)'
      }
    }
  },
  plugins: []
};
