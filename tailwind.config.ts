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
				alexSky: "#C3EBFA",
				alexSkyLight: "#EDF9FD",
				alexPurple: "#CFCEFF",
				alexPurpleLight: "#F1F0FF",
				alexYellow: "#FAE27C",
				alexYellowLight: "#FEFCE8"
			}
		}
	},
	plugins: []
};

export default config;
