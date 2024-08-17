import { Store } from '$lib/helpers/Store.svelte';
import type { IDepositTrx, IWithdrawTrx } from './transaction.model';

export const depositTrxStore = Store<IDepositTrx[]>([]);
export const withdrawTrxStore = Store<IWithdrawTrx[]>([]);
