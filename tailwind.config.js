// eslint-disable-next-line no-undef
module.exports = {
  // mode: 'jit',
  // jit document: https://tailwindcss.com/docs/just-in-time-mode
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'hblack-1': '#0e0304',
        'hblack-2': '#1e1e1e',
        'hblack-2.5': '#2C2B2B',
        'hblack-3': '#353535',
        'hblack-4': '#676767',
        'hyellow-1': '#f7b91c',
        'hblue-1': '#2f49d1',
        'hgreen-1': '#10b981',
        'hred-1': '#ef4444',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
