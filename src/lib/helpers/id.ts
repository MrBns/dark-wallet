import { init } from '@paralleldrive/cuid2';

export default function (length = 15) {
	const createId = init({
		length
	});
	return createId();
}
