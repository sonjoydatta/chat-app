/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#17a2b8',
				'primary-dark': '#138496',
			},
		},
	},
	plugins: [],
};
