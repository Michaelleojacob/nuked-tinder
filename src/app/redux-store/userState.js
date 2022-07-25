import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { app, db } from './../firebase-utils/firebase';
import { isUserSignedIn } from './../firebase-utils/auth';
import newUserFactory from '../utils/defaultUserFactory';

const newUser = newUserFactory();

// uid: uid || null,
// first: null,
// last: null,
// age: null,
// bio: null,
// mainPhoto: null,
// photos: [],
// interests: [],

export const userSlice = createSlice({
  name: 'userStatus',
  initialState: {
    loggedIn: isUserSignedIn(),
    ...newUser,
  },
  reducers: {
    updateBasedOnAuth: (state, action) => {
      return {
        ...state,
        loggedIn: action.payload,
      };
    },
    updateDynamic: (state, action) => {
      return {
        ...state,
        [action.payload.label]: action.payload.value,
      };
    },
    updateUid: (state, action) => {
      return {
        ...state,
        uid: action.payload,
      };
    },
    addPhoto: (state, action) => {
      return {
        ...state,
        photos: [...state.photos, action.payload],
      };
    },
    removePhoto: (state, action) => {
      const newArr = [...state.photos].filter(
        (item) => item !== action.payload
      );
      return {
        ...state,
        photos: [...newArr],
      };
    },
    updateStateOnLogIn: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    pushLikedUser: (state, action) => {
      return {
        ...state,
        likedUsers: [...state.likedUsers, action.payload],
      };
    },
  },
});

export const checkLocalUser = (state) => ({ ...state.userStatus });
export const checkLocalUserSignedIn = (state) => state.userStatus.loggedIn;
export const checkLocalUid = (state) => state.userStatus.uid;
export const checkUserPhotos = (state) => state.userStatus.photos;

export const {
  updateBasedOnAuth,
  updateDynamic,
  updateUid,
  addPhoto,
  updateStateOnLogIn,
  removePhoto,
  pushLikedUser,
} = userSlice.actions;

export default userSlice.reducer;
