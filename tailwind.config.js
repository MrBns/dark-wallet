/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{svelte,ts,js}'],
	theme: {
		extend: {
			container: {
				center: true
			},
			fontFamily: {
				oswald: ['Oswald', 'sans-serif']
			}
		}
	},
	plugins: []
};
