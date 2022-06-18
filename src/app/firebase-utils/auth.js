import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
  reauthenticateWithPopup,
} from 'firebase/auth';

import { createNewUser } from './firestore-newUser';

export let authInfo;

//simple example, pre checking first time
export const authSignInUser = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(getAuth(), provider);
};

export const deleteUser = () => {
  const user = getAuth().currentUser;
  return user.auth.deleteUser(user.uid);
};

export const reAuthenticate = async () => {
  const user = getAuth().currentUser;
  console.log(user);
};
// export const reAuthenticate = async () => {
//   const thing = await reauthenticateWithPopup(new GoogleAuthProvider());
//   console.log(thing);
// };

export const signInWithReAuth = async () => {
  const provider = new GoogleAuthProvider();
  const res = await reauthenticateWithPopup(getAuth(), provider);
  console.log(res);
  const info = getAdditionalUserInfo(res);
  console.log(info);
  if (info.isNewUser) {
    console.log('isNewUser true');
  }
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

export const getCurrentAuthUser = () => {
  // console.log(user);
  console.log(getAuth().currentUser);
  return getAuth().currentUser;
};

export const authSignOutUser = async () => {
  await signOut(getAuth());
};

export const isUserSignedIn = () => !!getAuth().currentUser;
