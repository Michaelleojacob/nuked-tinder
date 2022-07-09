import { getStorage, listAll, ref, uploadBytes } from 'firebase/storage';

export const storage = getStorage();

export const getFolder = async (user) => {
  const listRef = ref(storage, user);
  const photoList = await listAll(listRef);
  return photoList.items;
};

export const saveUserImage = async (file, user) => {
  try {
    console.log(file);
    const storageRef = ref(storage, `${user.uid}/${user.photos.length}`);
    const myimg = await uploadBytes(storageRef, file);
    console.log(myimg);
    console.log(myimg.ref);
    console.log(myimg.ref._location.path_);
  } catch (e) {
    console.error(e);
  }
};
