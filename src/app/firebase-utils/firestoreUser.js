import { db } from './firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

export const getUser = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => console.log(doc.data()));
};
