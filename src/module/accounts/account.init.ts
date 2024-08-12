import { getAllAccountsFromDb } from './account.services';
import { accounts } from './account.svelte';

export default async function accountInit() {
	try {
		// Loading All Accounts;

		getAllAccountsFromDb().then((value) => {
			accounts.value = value || [];
		});
	} catch (e) {
		console.error(e);
	}
}
