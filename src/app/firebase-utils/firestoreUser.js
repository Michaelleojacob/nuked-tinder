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
import { saveImageToBucket, deletePhotoFromBucket } from './firebasePhotos';

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

// expects uid, and photo.name ex:
export const updateUserPhotos = async (uid, photo) => {
  console.log(uid, photo);
  try {
    const userRef = doc(db, 'users', uid);
    const res = await updateDoc(userRef, {
      photos: arrayUnion(photo),
    });
  } catch (e) {
    console.error(e);
  }
};

// export const deletePhotoFromUser = async (uid, locationURL) => {
//   try {
//     const userRef = doc(db, 'users', uid);
//     await updateDoc(userRef, {
//       photos: deleteField(locationURL),
//     });
//   } catch (e) {
//     console.error(e);
//   }
// };

export const deletePhotoFromUser = (uid, locationURL) => {
  const userRef = doc(db, 'users', uid);
  return new Promise((resolve, reject) => {
    updateDoc(userRef, {
      photos: deleteField(locationURL),
    })
      .then(() => resolve('photo deleted from user doc'))
      .catch((err) => reject(err));
  });
};

export const deleteImgFromUserDocAndBucket = async (uid, locationURL) => {
  try {
    const result = await Promise.all([
      deletePhotoFromBucket(locationURL),
      deletePhotoFromUser(uid, locationURL),
    ]);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};
