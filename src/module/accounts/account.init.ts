import { onSnapshot, orderBy, query } from 'firebase/firestore';

import { accountCollection } from './account.constant';
import type { AccountI } from './account.interface';
import { accounts } from './account.svelte';

export default async function accountInit() {
	try {
		// Loading All Accounts;

		onSnapshot(query(accountCollection, orderBy('amount.unOfficial', 'desc')), (snapshot) => {
			const docs = snapshot.docs
				.filter((v) => v.exists())
				.map((v) => {
					return {
						...v.data(),
						documentId: v.id
					} as AccountI;
				});
			accounts.value = docs;
		});
	} catch (e) {
		console.error(e);
	}
}
