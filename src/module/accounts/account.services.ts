import { getDocs, query } from 'firebase/firestore';
import { accountCollection } from './account.constant';
import type { AccountI } from './account.interface';

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
