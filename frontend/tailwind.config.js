module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FDE1DF",
          400: "#c7376b",
          500: "#9b305e",
          900: "#792443",
        },
      },
      height: {
        120: "480px",
      },
      width: {
        100: "400px",
        200: "800px",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      padding: {
        "px-4.5": "15px",
      },
      zIndex: {
        "-10": "-10",
      },
      inset: {
        "1/10": "10%",
      },
    },
  },
  variants: {
    // NOT WORKING
    extend: {
      textColor: ["group-focus"],
    },
  },
  plugins: [],
};
