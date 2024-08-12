export default function fmtCurrency(arg: number, type: 'short' | 'long' = 'long') {
	const formatter = Intl.NumberFormat(
		'en-US',
		type === 'long'
			? {}
			: { maximumFractionDigits: 2, notation: 'compact', compactDisplay: 'short' }
	);
	return formatter.format(arg);
}
