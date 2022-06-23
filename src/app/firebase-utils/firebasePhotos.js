import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

export const saveImageMessage = async (file, userPhotoCollection) => {
  try {
    const storageRef = ref(storage, userPhotoCollection);
    return await uploadBytes(storageRef, file);
    // const imgRef = ref(storage, file);
    // return await uploadBytes(imgRef);
  } catch (e) {
    console.error(e);
  }
};
