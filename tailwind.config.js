/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primaryMain: "#818cf8",
        lightGray: "#e5e5e5",
        gradientYellow: "#eae68e",
        gradientOrange: "#fbbebe",
        gradientBlue: "#bee1fb"
      },
    },
  },
  plugins: [],
}

