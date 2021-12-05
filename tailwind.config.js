module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          1: '#1F2933',
          2: '#323F4B',
          3: '#475A6B',
          4: '#7B8794',
          5: '#9AA5B1',
          6: '#CBD2D9',
          7: '#E4E7EB',
          8: '#F2F3F5',
          9: '#F8F9FA',
        },
        green: {
          1: '#7AA939',
          2: '#8FC247',
          3: '#ABD175',
          4: '#C7E0A3',
          5: '#ECF5E0',
          6: '#F5FAF0'
        },
        blue: {
          1: '#2C51B0',
          2: '#75A2E3',
          3: '#E9F4FF',
          4: '#FBFEFF',
          6: '#EEF1FB',
        },
        red: {
          1: '#FF4B4B',
          2: '#FFE8E8',
          3: '#FFF8F8',
        },
        greenAlert: {
          1: '#00BB1D',
          2: '#EBFFEE'
        },
        yellow: {
          1: '#FFD200'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
