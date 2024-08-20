import { getStorage, ref } from 'firebase/storage';

import { firebaseApp } from './init';
import id from '$lib/helpers/cuid';

export const storage = getStorage(firebaseApp);
export function accountLogoRef(file: File) {
	const [name, ext] = file.name.split('.');
	const filePath = `account-logo/${name}-${id(50)}.${ext}`;
	return ref(storage, filePath);
}
