import type { Timestamp } from 'firebase/firestore';

export interface IDepositTrx {
	documentId: string;
	id: string;
	amount: {
		official: number;
		unOfficial: number;
	};
	account: string;
	note: string;
	description: string;
	createdAt: Timestamp;
}

export interface IWithdrawTrx {
	documentId: string;
	id: string;
	amount: {
		official: number;
		unOfficial: number;
	};
	account: string;
	note: string;
	description: string;
	createdAt: Timestamp;
}
