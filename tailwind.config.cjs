/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        flowbite: {
          blue: '#1c65f2',
          'grub-yellow-400': '#FF0',
          'grub-gray-400': '#1a1a1a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
}
