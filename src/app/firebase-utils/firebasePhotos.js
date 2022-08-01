import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';

export const storage = getStorage();

export const testPhotos = async (uid) => {
  const photos = await listAll(ref(storage, uid));
  return photos.items;
};

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

/**
 * needs both photo and photo.name
 */
export const savePhotoToBucket = async (user, photo) => {
  const storageRef = ref(storage, `${user}/${photo.name}`);
  const res = await uploadBytes(storageRef, photo)
    .then(() => true)
    .catch((err) => {
      console.log(err);
      return false;
    });
  return res;
};

export const deletePhotoFromBucket = (path) => {
  const deletePhotoRef = ref(storage, path);
  return new Promise((resolve, reject) => {
    deleteObject(deletePhotoRef)
      .then(() => resolve('photo deleted from bucket'))
      .catch((err) => reject(err));
  });
};
