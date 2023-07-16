/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './node_modules/flowbite/**/*.js'],
  theme: {
    container: {
      center: true,
      padding: '36px',
    },
    extend: {
      colors: {
        primary: '#28d07e',
        secondary: '#4e764E',
        background: '#161b21',
        background2: '#1f252d',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
