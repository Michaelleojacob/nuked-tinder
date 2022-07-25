import {
  setDoc,
  doc,
  serverTimestamp,
  addDoc,
  collection,
} from 'firebase/firestore';
import { db } from './firebase';

export const createChatRoom = async (uids) => {
  try {
    const name = `${uids[0]}-${uids[1]}`;
    await setDoc(doc(db, 'rooms', name), {
      name,
      chatUsers: [...uids],
    });
    const docRef = doc(db, 'rooms', name);
    const colRef = collection(docRef, 'messages');
    await addDoc(colRef, {
      msg: 'You both matched! Be the first to say something.',
      from: 'tinder-clone',
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.error(e);
  }
};
