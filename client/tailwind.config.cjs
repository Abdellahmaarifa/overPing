/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter, sans-serif",
        rubik: "Rubik, sans-serif",
        passero_one: "Passero One, sans-serif",
        poppins: "Poppins, sans-serif",
      },
      colors: {
        "btn-white": "#B4B5CF",
        "btn-black": "#1F272E",
        "btn-blue": "#227BC9",
        "btn-white-disable": "#CDCDDF",
        "btn-black-disable": "#696E73",
      },
      backgroundColor: {
        main: "#0F1A24",
      },
      backgroundImage: {
        ellipsLinearGradient:
          "linear-gradient(180deg, rgba(181, 174, 174, 0.56) 0%, rgba(255, 0, 0, 0.35) 100%)",
        ellipsRadialGradient:
          "radial-gradient(50% 50% at 50% 50%, #CD4A4A 0%, rgba(205, 74, 74, 0.00) 100%)",
        "login-gradient":
          "linear-gradient(270deg, #A43838 0.74%, rgba(164, 56, 56, 0.00) 100%)",
        "login-gradient-mobile":
          "linear-gradient(0deg, #A43838 0.74%, rgba(164, 56, 56, 0.00) 100%)",
      },
    },
  },
  plugins: [],
};
