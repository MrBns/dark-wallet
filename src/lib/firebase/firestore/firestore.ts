import { collection, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../init';

export const db = getFirestore(firebaseApp);

//Accounts Collection;
export const accountCollectionName = 'Accounts';
export const accountCollection = collection(db, accountCollectionName);

// Transaction Collection;
export const trxCollectionName = 'Transactions';
export const trxCollection = collection(db, trxCollectionName);
