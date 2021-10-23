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
        yellowOrange: "#f3c19d",
        lightYellow: "#fdf5e1",
        brown: { DEFAULT: "#8a5b4c", dark: "#6F473C" },
      },
      height: {
        120: "480px",
      },
      width: {
        "1/8": "12.5%",
        "1/10": "10%",
        100: "400px",
        200: "800px",
        "screen-1/6": "16.666vw",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        40: "160px",
      },
      minWidth: {
        25: "100px",
        32: "128px",
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
        "1/6": `${100 / 6}%`,
        "1/5": "20%",
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
