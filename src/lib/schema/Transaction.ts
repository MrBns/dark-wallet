import id from '$lib/helpers/id';
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

export const TransactionSchema = z.object({
	id: z.string().cuid('must be a cuid').default(id(20)),
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
	accounts: z.object({
		account: z.array(
			z.string().refine((arg) => {
				console.log(arg);
				return true;
			}, '')
		),
		amount
	})
});
