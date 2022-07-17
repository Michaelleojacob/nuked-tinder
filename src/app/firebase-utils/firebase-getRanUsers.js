import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

export const getUsers = async () => {
  const arr = [];
  const querySnapShot = await getDocs(collection(db, 'users'));
  querySnapShot.forEach((doc) => arr.push(doc.data()));
  return arr;
};
