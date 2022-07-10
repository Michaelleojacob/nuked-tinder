import { db } from './firebase';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  deleteField,
} from 'firebase/firestore';

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

export const updateUserPhotos = async (uid, photo) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    photos: arrayUnion(photo),
  });
};

export const deletePhotoFromUser = async (uid, locationURL) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      photos: deleteField(locationURL),
    });
  } catch (e) {
    console.error(e);
  }
};
