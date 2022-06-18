import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';

import { createNewUser } from './firestore-newUser';

export let authInfo;

//simple example, pre checking first time
export const authSignInUser = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(getAuth(), provider);
};

export const signInWithExtraInfo = async () => {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(getAuth(), provider);
  const info = getAdditionalUserInfo(res);
  authInfo = info;
  if (info.isNewUser) {
    await createNewUser(res.user);
  }
};

export const logGetAuth = () => {
  console.log(getAuth().currentUser);
};

export const authSignOutUser = async () => {
  await signOut(getAuth());
};

export const isUserSignedIn = () => !!getAuth().currentUser;
