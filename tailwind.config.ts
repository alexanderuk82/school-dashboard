import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				// Alex color palette
				alexSky: "#C3EBFA", // Soft blue
				alexSkyLight: "#EDF9FD", // Lighter blue
				alexPurple: "#CFCEFF", // Soft purple
				alexPurpleLight: "#F1F0FF", // Lighter purple
				alexYellow: "#FAE27C", // Soft yellow
				alexYellowLight: "#FEFCE8" // Lighter yellow
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
			}
		}
	},
	plugins: []
};

export default config;
