import { deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { accountCollection } from './account.constant';
import type { AccountI } from './account.interface';
import { accounts } from './account.svelte';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { accountLogoRef } from '$lib/firebase/storage';

export async function getAllAccountsFromDb() {
	try {
		const q = query(accountCollection);
		const result = await getDocs(q);
		return result.docs.map(
			(d) =>
				({
					...d.data(),
					documentId: d.id
				}) as AccountI
		);
	} catch (e) {
		console.error(e);
	}
}

export async function deleteSingleAccount(documentId: string) {
	try {
		const _doc = doc(accountCollection, documentId);
		await deleteDoc(_doc);
		const newAccounts = await getAllAccountsFromDb();
		accounts.value = newAccounts || [];
	} catch (e) {
		console.error(e);
	}
}

export async function uploadAccountLogo(file: File) {
	try {
		// guards;
		if (!/(png|jpeg|webp)$/gi.test(file.name))
			throw new Error('Only PNG, JPEG and WEBP format are supported for Account logo');
		if (file.size > 1024 * 512) throw new Error('File Size cannot be More than 0.5Mb');

		return uploadBytes(accountLogoRef(file), file).then(async (snapshot) => {
			const url = await getDownloadURL(snapshot.ref);
			return {
				err: '',
				success: true,
				pubLink: url
			};
		});
	} catch (e) {
		return {
			err: e instanceof Error ? e.message : 'something went wrong',
			success: false,
			pubLink: ''
		};
	}
}
