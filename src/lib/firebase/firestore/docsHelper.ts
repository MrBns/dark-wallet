import { doc, DocumentSnapshot, getDoc, type CollectionReference } from 'firebase/firestore';
import { db } from './firestore';

export async function isDocumentExist<T>(id: string, collection: CollectionReference) {
	return (await getDoc(doc(db, collection.path, id))) as DocumentSnapshot<T>;
}
