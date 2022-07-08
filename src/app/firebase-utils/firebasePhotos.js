import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

export const saveUserImage = async (file, user) => {
  try {
    const storageRef = ref(storage, `${user.uid}/${user.photos.length}`);
    await uploadBytes(storageRef, file);
  } catch (e) {
    console.error(e);
  }
};
