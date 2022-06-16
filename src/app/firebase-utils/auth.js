import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const signInUser = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

export const signOutUser = async () => {
  await signOut(getAuth());
};

export const isUserSignIn = () => !!getAuth().currentUser;
