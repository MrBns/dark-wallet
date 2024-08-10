import { doc, getDoc, type CollectionReference } from 'firebase/firestore';
import { db } from './firestore';

export async function isDocumentExist(id: string, collection: CollectionReference) {
	return await getDoc(doc(db, collection.path, id));
}
