import { db } from '$lib/firebase/firestore/firestore';
import { doc, getDoc, increment, serverTimestamp, writeBatch } from 'firebase/firestore';
import type { z } from 'zod';
import type { createTrxValidator } from './transaction.validator';
import { accountCollection } from '$module/accounts/account.constant';
import { depositTrxCollection, withdrawTrxCollection } from './transaction.constant';
import type { IDepositTrx } from './transaction.model';

type TCreateTrxData = z.infer<typeof createTrxValidator>;

/* Creating Deposit Transaction */
export async function createDepositTrx(param: TCreateTrxData) {
	try {
		const batch = writeBatch(db);
		const accountDoc = await getDoc(doc(accountCollection, param.account));
		if (!accountDoc.exists()) throw Error("account doesn't Exist");
		batch.update(accountDoc.ref, {
			'amount.official': increment(param.amount.official),
			'amount.unOfficial': increment(param.amount.unOfficial)
		});
		const depositTrxDoc = doc(depositTrxCollection);
		batch.set(depositTrxDoc, <IDepositTrx>{
			account: param.account,
			amount: param.amount,
			id: param.id,
			createdAt: serverTimestamp(),
			description: param.description,
			note: param.note
		});

		batch
			.commit()
			.then(() => {
				console.log('Batch committed successfully');
			})
			.catch((e) => {
				console.error(e);
			});
	} catch (e) {
		console.error(e);
	}
}

/* Creating Withdraw Transaction */

export async function createWithdrawTrx(param: TCreateTrxData) {
	try {
		const batch = writeBatch(db);
		const accountDoc = await getDoc(doc(accountCollection, param.account));
		if (!accountDoc.exists()) throw Error("account doesn't Exist");
		batch.update(accountDoc.ref, {
			'amount.official': increment(-param.amount.official),
			'amount.unOfficial': increment(-param.amount.unOfficial)
		});
		const depositTrxDoc = doc(withdrawTrxCollection);
		batch.set(depositTrxDoc, <IDepositTrx>{
			account: param.account,
			amount: param.amount,
			id: param.id,
			createdAt: serverTimestamp(),
			description: param.description,
			note: param.note
		});

		batch
			.commit()
			.then(() => {
				console.log('Batch committed successfully');
			})
			.catch((e) => {
				console.error(e);
			});
	} catch (e) {
		console.error(e);
	}
}
