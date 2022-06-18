import { db } from './firebase';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import newUserFactory from '../utils/defaultUserFactory';

export const getUser = async (uid) => {
  const userRef = doc(db, 'users', uid);
  return await getDoc(userRef);
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => console.log(doc.data()));
};

export const createNewUser = async (user) => {
  try {
    const newUser = newUserFactory(user.uid);
    await setDoc(doc(db, 'users', user.uid), {
      ...newUser,
    });
  } catch (e) {
    console.error(e);
  }
};
