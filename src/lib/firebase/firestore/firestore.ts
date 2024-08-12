import { collection, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../init';

export const db = getFirestore(firebaseApp);

// Transaction Collection;
export const trxCollectionName = 'Transactions';
export const trxCollection = collection(db, trxCollectionName);
