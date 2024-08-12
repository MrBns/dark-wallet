import type { Timestamp } from 'firebase/firestore';

export interface ITransaction {
	documentId: string;
	id: string;
	note: string;
	description?: string;
	amount: {
		official: number;
		unOfficial: number;
	};
	type: 'deposit' | 'withdraw';
	accountId: string;
	createdAt: Timestamp;
}
