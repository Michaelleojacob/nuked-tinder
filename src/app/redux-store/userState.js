import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { app, db } from './../firebase-utils/firebase';
import { isUserSignedIn } from './../firebase-utils/auth';
import newUserFactory from '../utils/defaultUserFactory';

const newUser = newUserFactory();

// uid: uid || null,
// fullName: null,
// first: null,
// last: null,
// age: null,
// bio: null,
// mainPhoto: null,
// photos: [],
// jobTitle: null,
// location: null,
// interests: [],

export const userSlice = createSlice({
  name: 'userStatus',
  initialState: {
    loggedIn: isUserSignedIn(),
    ...newUser,
  },
  reducers: {
    signInLocalUser: (state) => {
      state.loggedIn = true;
    },
    signOutLocalUser: (state) => {
      const resetUser = newUserFactory();
      resetUser.loggedIn = isUserSignedIn();
      console.log(state, resetUser);
    },

    updateBasedOnAuth: (state, action) => {
      state.loggedIn = action.payload;
    },
    updateDynamic: (state, action) => {
      state[action.payload.label] = action.payload.value;
    },
    updateUid: (state, action) => {
      state.uid = action.payload;
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
  },
});

export const checkLocalUser = (state) => ({ ...state.userStatus });
export const checkLocalUserSignedIn = (state) => state.userStatus.loggedIn;
export const checkLocalUid = (state) => state.userStatus.uid;
export const checkUserPhotos = (state) => state.userStatus.photos;

export const {
  signInLocalUser,
  signOutLocalUser,
  updateBasedOnAuth,
  updateDynamic,
  updateUid,
  addPhoto,
} = userSlice.actions;

export default userSlice.reducer;
