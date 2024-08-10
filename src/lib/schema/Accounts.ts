import id from '$lib/helpers/id';
import { z } from 'zod';

export const AccountSchema = z.object({
	id: z.string().default(id(20)),
	name: z
		.string({ required_error: 'Name Cannot be Empty' })
		.min(1, 'AccountName cannot be empty')
		.max(50, 'Account name Cannot be Greater than 50 latter'),
	logo: z
		.string({
			invalid_type_error: 'logo must in string format'
		})
		.url('logo must be a valid url')
		.optional(),
	amount: z.object({
		official: z
			.number({
				invalid_type_error: 'Official Amount Must be Number',
				required_error: 'Official Amount is required'
			})
			.nonnegative('Official Amount cannot be negative'),
		unOfficial: z
			.number({
				invalid_type_error: 'Official Amount Must be Number',
				required_error: 'Official Amount is required'
			})
			.nonnegative('Unofficial Amount cannot be negative')
	})
});

export type TAccount = z.infer<typeof AccountSchema> & {
	id: string;
};
