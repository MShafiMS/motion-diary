/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // Configure your color palette here
      //
      primary: "#F57584",
      secondary: "",
      accent: "",
      warning: "",
      black: "#000000",
      white: "#ffffff",
      neutral: "#343434",
      silver: "#e9e9e9",
    },
  },
  plugins: [],
};
