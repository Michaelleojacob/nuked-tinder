import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
// import { updateUserPhotos } from './firestoreUser';

export const storage = getStorage();

export const getUserImages = async (uid) => {
  await listAll(ref(storage, uid)).then((res) => {
    res.items.forEach(async (item) => {
      await getDownloadURL(ref(storage, item)).then((downloadURL) => {
        return downloadURL;
      });
    });
  });
};

export const getFolder = async (uid) => {
  const listRef = ref(storage, uid);
  const photoList = await listAll(listRef);
  return photoList.items;
};

// expects what?
/**
 * needs both photo and photo.name
 *
 */
export const savePhotoToBucket = async (user, photo) => {
  console.log(photo, user);
  const storageRef = ref(storage, `${user}/${photo.name}`);
  const res = await uploadBytes(storageRef, photo);
  return res;
};

// export const deletePhotoFromBucket = async (path) => {
//   try {
//     const deletePhotoRef = ref(storage, path);
//     await deleteObject(deletePhotoRef);
//   } catch (e) {
//     console.error(e);
//   }
// };
// export const deletePhotoFromBucket = async (path) => {
//   return new Promise((res, rej) => {
//     const deletePhotoRef = ref(storage, path);
//     return new Promise((res, rej) =>
//       deleteObject(deletePhotoRef).then((res) =>
//         console.log(`${res} : ${path} was successfully deleted`)
//       )
//     );
//   });
// };
// export const deletePhotoFromBucket = (path) => {
//   const deletePhotoRef = ref(storage, path);
//   const res = deleteObject(deletePhotoRef).then(() => {
//     console.log(`deleteObject happened`);
//   });
//   return res;
// };

export const deletePhotoFromBucket = (path) => {
  const deletePhotoRef = ref(storage, path);
  return new Promise((resolve, reject) => {
    deleteObject(deletePhotoRef)
      .then(() => resolve('photo deleted from bucket'))
      .catch((err) => reject(err));
  });
};
