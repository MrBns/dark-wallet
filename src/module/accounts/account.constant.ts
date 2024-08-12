import { db } from '$lib/firebase/firestore/firestore';
import { collection } from 'firebase/firestore';

export const accountCollectionName = 'Accounts';
export const accountCollection = collection(db, accountCollectionName);
