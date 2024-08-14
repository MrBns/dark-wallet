import id from '$lib/helpers/id';
import { accounts, getAccountByKey } from '$module/accounts/account.svelte';
import { z } from 'zod';

const amount = z.object({
	official: z.number({
		required_error: 'official amount is required',
		invalid_type_error: 'Official amount must be in number'
	}),
	unOfficial: z.number({
		required_error: 'unOfficial amount is required',
		invalid_type_error: 'Official amount must be in number'
	})
});

export const createTrxValidator = z
	.object({
		id: z.string().default(id(20)),
		note: z
			.string({
				required_error: 'Transaction Note is Required'
			})
			.max(100, 'transaction note cannot over 100 letters'),
		description: z.string().max(400, 'Description cannot be over 400 letters').optional(),
		type: z.enum(['deposit', 'withdraw'], {
			required_error: 'Type is Required',
			invalid_type_error: '{VALUE} is not supported'
		}),
		amount,
		account: z.string().refine((v) => {
			return Boolean(accounts.value.find((d) => d.documentId === v));
		}, "Account Doesn't Exist ")
	})
	.refine(
		(v) => {
			const account = getAccountByKey('documentId', v.account);
			if (!account) return false;
			if (v.type === 'deposit') return true;
			if (v.amount.official > account.amount.official) {
				return false;
			}
			return true;
		},
		{
			path: ['amount'],
			message: 'Official expense amount cannot be more than available Balance'
		}
	)
	.refine(
		(v) => {
			const account = getAccountByKey('documentId', v.account);
			if (!account) return false;
			if (v.type === 'deposit') return true;
			if (v.amount.unOfficial > account.amount.unOfficial) {
				return false;
			}
			return true;
		},
		{
			path: ['amount'],
			message: 'Official expense amount cannot be more than available Balance'
		}
	);
