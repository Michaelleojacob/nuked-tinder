import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import newUserFactory from '../utils/defaultUserFactory';

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

export const createMock = async (botObject) => {
  try {
    await setDoc(doc(db, 'users', botObject.uid), {
      ...botObject,
    });
  } catch (e) {
    console.error(e);
  }
};
