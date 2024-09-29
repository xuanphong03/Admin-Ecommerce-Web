/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        table: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
        form: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)',
        'form-identify': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
      },
      width: {
        125: '500px',
        140: '560px',
        150: '600px',
      },
    },
  },
  plugins: [],
};
