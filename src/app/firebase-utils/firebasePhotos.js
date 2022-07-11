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

export const saveImageToBucket = async (file, user) => {
  try {
    const storageRef = ref(storage, `${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    console.log(file);
    // await updateUserPhotos(user.uid, `${user.uid}/${file.name}`);
  } catch (e) {
    console.error(e);
  }
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
