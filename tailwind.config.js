/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "740px",

      lg: "1020px",

      xl: "1260px",

      "2xl": "1440px",

      "3xl": "1620px",

      "full-hd": "1900px",
    },
  },
  plugins: [],
};
