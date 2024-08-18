import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{svelte,ts,js}'],
	theme: {
		screens: {
			xs: '420px', // extra small
			sm: '640px', // small
			md: '768px', // Medium
			ml: '890px', // Medium Large;
			lg: '1024px', // Large
			xl: '1280px', // Extra Large
			'2xl': '1536px' // Extra large 2
		},
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem'
				}
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				oswald: ['Oswald', 'sans-serif']
			},
			colors: {
				primary: colors.sky,
				dark: colors.gray,
				secondary: colors.slate,
				danger: colors.red
			}
		}
	},
	plugins: []
};
