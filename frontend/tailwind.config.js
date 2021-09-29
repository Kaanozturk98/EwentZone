module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F18562",
          DEFAULT: "#FD763F",
          dark: "#D4653C",
        },
        secondary: {
          light: "#FBDB33",
          DEFAULT: "#D4B50E",
          dark: "#D0B10D",
        },
        yellowOrange: "#FFC091",
      },
      height: {
        120: "480px",
      },
      width: {
        100: "400px",
        200: "800px",
        "screen-1/6": "16.666vw",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      minWidth: {
        50: "200px",
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
    extend: {
      display: ["group-hover"],
      transitionDelay: ["group-hover", "hover", "focus"],
      transitionProperty: ["group-hover", "hover", "focus"],
    },
  },
  plugins: [],
};
