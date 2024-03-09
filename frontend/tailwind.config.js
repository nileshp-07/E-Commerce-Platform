/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      'royal-blue': {
        '50': '#f0f5fe',
        '100': '#dde7fc',
        '200': '#c2d5fb',
        '300': '#99bbf7',
        '400': '#6897f2',
        '500': '#3869eb',
        '600': '#2f54e1',
        '700': '#2741ce',
        '800': '#2636a7',
        '900': '#243384',
        '950': '#1a2151',
      },
      pink: {
        5: "#FFF1F1",
        25: "#FBC7D1",
        50: "#F79CB0",
        100: "#F37290",
        200: "#EF476F",
        300: "#D43D63",
        400: "#BA3356",
        500: "#9F294A",
        600: "#841E3E",
        700: "#691432",
        800: "#4F0A25",
        900: "#340019",
      },
      caribbeangreen: {
        5: "#C1FFFD",
        25: "#83F1DE",
        50: "#44E4BF",
        100: "#06D6A0",
        200: "#05BF8E",
        300: "#05A77B",
        400: "#049069",
        500: "#037957",
        600: "#026144",
        700: "#014A32",
        800: "#01321F",
        900: "#001B0D",
      },
    },
    extend: {},
  },
  plugins: [],
}
