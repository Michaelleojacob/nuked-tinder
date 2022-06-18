import { db } from './firebase';
import { doc, addDoc, collection, getDoc } from 'firebase/firestore';

export const getUser = async (uid) => {
  const userRef = doc(db, 'users', uid);
  return await getDoc(userRef);
};

export const createNewUser = async (uid, data) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      uid: data,
    });
    return docRef.id;
  } catch (e) {
    console.error(e);
  }
};
