/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: '#root',
  theme: {
    extend: {
      colors: {
        bg: {
          200: "#F4F4F2",
          400: "#E8E8E8",
          600: "#BBBFCA",
          800: "#495464",
        },
        main: {
          200: "#DBDFFD",
          400: "#9BA3EB",
          500: "#2955D7",
          600: "#646FD4",
          800: "#242F9B",
        },
        mark: {
          200: "#53BF9D",
          400: "#F94C66",
          600: "#BD4291",
          800: "#FFC54D",
        },
      },
      backgroundImage: {
        "main-img": "url('asset/images/home-page-background.svg')",
      },
      boxShadow: {
        nav: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        ser: "4px 5px 29px rgba(0, 0, 0, 0.25)",
      },
    },
    plugins: [],
  },
  corePlugins: {
    preflight: false,
  },
};
