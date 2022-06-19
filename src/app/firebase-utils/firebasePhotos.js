import { db } from './firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

export const saveImageMessage = async (file) => {
  try {
    const storageRef = ref(storage, 'some-child');
    return await uploadBytes(storageRef, file);
    // const imgRef = ref(storage, file);
    // return await uploadBytes(imgRef);
  } catch (e) {
    console.error(e);
  }
};
