import { db } from '$lib/firebase/firestore/firestore';
import { collection } from 'firebase/firestore';

export const depositTrxCollection = collection(db, 'DepositTransactions');
export const withdrawTrxCollection = collection(db, 'WithdrawTransactions');
