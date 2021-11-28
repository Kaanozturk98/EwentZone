module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F28454",
          DEFAULT: "#EE6123",
          dark: "#D14A10",
        },
        secondary: {
          light: "#FFDA33",
          DEFAULT: "#FFCF00",
          dark: "#EOB700",
        },
        babyPowder: "#FDFFFC",
        spaceShuttle: "#413d45",
        spanishBlue: "#246EB9",
        woodSmoke: "#F5F2ED",
        cream: "#FAF6F4",
      },
      height: {
        120: "480px",
      },
      width: {
        "1/8": "12.5%",
        "1/10": "10%",
        100: "400px",
        125: "500px",
        200: "800px",
        "screen-1/6": "16.666vw",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        32: "128px",
        40: "160px",
      },
      minWidth: {
        25: "100px",
        32: "128px",
        40: "160px",
        50: "200px",
        60: "240px",
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
