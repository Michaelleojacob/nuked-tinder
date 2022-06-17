import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const authSignInUser = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

export const getAuthUser = () => getAuth();

export const authSignOutUser = async () => {
  await signOut(getAuth());
};

export const isUserSignedIn = () => !!getAuth().currentUser;
