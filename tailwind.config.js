/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				primaryMain: "#818cf8",
				primaryMainLight: "#a5b4fc",
				lightGray: "#e5e5e5",
				lighterGray: "#fafafa",
				gradientYellow: "#eae68e",
				gradientOrange: "#fbbebe",
				gradientBlue: "#bee1fb",
			},
			borderRadius: {
				large: "12px",
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
};
