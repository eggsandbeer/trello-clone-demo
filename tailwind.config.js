/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: (theme) => ({
        ...theme('spacing')
      }),
      minHeight: (theme) => ({
        ...theme('spacing')
      })
    }
  },
  plugins: []
};
