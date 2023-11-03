/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contents/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      formback: "rgba(255, 255, 255, 0.2)",
      formbackhover: "rgba(50, 50, 50, 0.7)",
      formback1: "rgba(30, 30, 30, 0.5)",
      formback2: "rgba(44, 44, 44, 1)",
      textwhite: "#F4F4F4",
      borderwhite: "#949494",
      placehd: "rgba(255, 255, 255, 0.35)",
      placehd1: "rgba(244, 244, 244, 0.3)",
      placehd2: "rgba(244, 244, 244, 0.5)",
    },
    screens: {
      userMobile: "400px",
      // => @media (min-width: 640px) { ... }
      sm: "640px",
      md: "850px",
      lg: "1024px",
      xl: "1256px",
      "2xl": "1480px",
    },
  },
  plugins: [],
};
