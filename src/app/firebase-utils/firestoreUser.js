import { db } from './firebase';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { savePhotoToBucket, deletePhotoFromBucket } from './firebasePhotos';

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
  const userRef = doc(db, 'users', uid);
  const res = await updateDoc(userRef, {
    photos: arrayUnion(photo.name),
  })
    .then(() => true)
    .catch((err) => {
      console.error(`error in updateUserPhotos: ${err}`);
      return false;
    });
  return res;
};

// add photos to bucket and docs
export const addPhotoToBucketAndDocs = async (uid, photo) => {
  const result = await Promise.all([
    updateUserPhotos(uid, photo),
    savePhotoToBucket(uid, photo),
  ]);
  return result.every((item) => item);
};

//===============================================================================
// ## delete

export const deletePhotoFromUser = (uid, locationURL) => {
  /**
   * location url example:
   * LMwPP6AA6gOSeT34OIFmxOwt9LC3/apple-touch-icon.png
   * going to split it, and feed it just the 'apple-touch-icon.png'
   */
  const splitURL = locationURL.split('/');
  const userRef = doc(db, 'users', uid);
  return new Promise((resolve, reject) => {
    updateDoc(userRef, {
      photos: arrayRemove(splitURL[1]),
    })
      .then(() => resolve('photo deleted from user doc'))
      .catch((err) => reject(err));
  });
};

export const deleteImgFromUserDocAndBucket = async (uid, locationURL) => {
  /**
   * returning true/false via .then/.catch
   * if I want to check the resolves of deletePhotoFromUser || deletePhotoFromBucket
   * comment out the .then()+.catch()
   */
  const result = await Promise.all([
    deletePhotoFromBucket(locationURL),
    deletePhotoFromUser(uid, locationURL),
  ])
    .then(() => true)
    .catch((e) => {
      console.error(e);
      return false;
    });
  // console.log(result);
  return result;
};

// ## delete
//===============================================================================
