/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{html,tsx,js,jsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				"tab-content": "#F0F0F0",
				"primary-blue": "#053B50",
				"secondary-blue": "#176B87",
				"login-blue": "#0C4981",
				"hr-side": "#053B50",
				"stock-side": "#14213D",
				"primary-white": "#FAFAFA",
				"primary-black": "#111111",
				"primary-green": "#136A32",
				"primary-red": "#E70005",
				"top-bar": "#F1F5F9",
				"search-bg": "#F1F5F9",
			},
			backgroundImage: {
				"laundry-bg": "url('/laundry-bg.svg')",
			},
			fontFamily: {
				nunito: ["Nunito"],
				loginDes: ["loginDes"],
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
