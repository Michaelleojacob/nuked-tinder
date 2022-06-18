import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';

import { createNewUser } from './firestore-newUser';

export const signInWithExtraInfo = async () => {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(getAuth(), provider);
  const info = getAdditionalUserInfo(res);
  if (info.isNewUser) {
    await createNewUser(res.user);
  }
};

export const logGetAuth = () => {
  console.log(getAuth().currentUser);
};

export const getUid = () => {
  return getAuth().currentUser ? getAuth().currentUser.uid : null;
};

export const authSignOutUser = async () => {
  await signOut(getAuth());
};

export const isUserSignedIn = () => !!getAuth().currentUser;
