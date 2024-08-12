import { DerivedBy, Store } from '$lib/helpers/Store.svelte';
import type { AccountI } from './account.interface';

export const accounts = Store<AccountI[]>([]);

export function getAccountByKey(key: keyof AccountI, value: AccountI[typeof key]) {
	return accounts.value.find((v) => v[key] === value);
}

export const totalOfficialAmount = DerivedBy(() => {
	return $state
		.snapshot(accounts.value)
		.reduce((accumulator, current) => accumulator + current.amount.official, 0);
});
export const totalUnofficialAmount = DerivedBy<number>(() => {
	return accounts.value.reduce(
		(accumulator, current) => accumulator + current.amount.unOfficial,
		0
	);
});
