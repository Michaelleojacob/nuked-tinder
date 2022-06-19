import { db } from './firebase';
import { doc, getDoc, getDocs, collection, setDoc } from 'firebase/firestore';

export const getUser = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => console.log(doc.data()));
};

export const updateUser = async (label, data) => {
  const userRef = doc(db, 'users', data.uid);
  await setDoc(
    userRef,
    {
      [label]: data[label],
    },
    { merge: true }
  );
};
