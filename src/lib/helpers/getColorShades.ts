import Color from 'color';

export default function (_color = '#b7ebc1') {
	const color = Color('#b7ebc1');
	const hslMode = color.hsl();
	console.log(hslMode.object());

	return ['#b7ebc1'];
}
