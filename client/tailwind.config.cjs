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
        "success-gradient":
          "linear-gradient(90deg, rgba(78, 149, 212, 0.57) 0%, rgba(31, 112, 183, 0.09) 100%)",
        "failed-gradient":
          "linear-gradient(90deg, rgba(219, 107, 107, 0.57) 0%, rgba(31, 112, 183, 0.09) 100%)",
        "profile-gradient": "linear-gradient(90deg, #800C34 0%, #10558A 100%)",
        "green-gradient":
          "linear-gradient(180deg, rgba(92, 186, 192, 0.27) 0%, rgba(148, 173, 89, 0.50) 100%)",
        "red-to-blue-gradient":
          "linear-gradient(174deg, rgba(37, 64, 159, 0.34) 2.88%, rgba(159, 37, 39, 0.50) 95.55%)",
        "yellow-to-pink":
          "linear-gradient(180deg, rgba(151, 64, 153, 0.78) 0%, #9E7031 100%)",
        "welcome-banner": "url(src/assets/home/welcome_banner.png)",
        "ping-boy": "url(src/assets/ping_boy.png)",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
