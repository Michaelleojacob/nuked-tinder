import { setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const createChatRoom = async (uids) => {
  try {
    console.log(uids);
    // const newChatRoom = `${uids[0]}${uids[1]}`;
    await setDoc(doc(db, 'rooms'), {});
  } catch (e) {
    console.error(e);
  }
};
