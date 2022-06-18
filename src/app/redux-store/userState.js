import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { app, db } from './../firebase-utils/firebase';
import { isUserSignedIn } from './../firebase-utils/auth';
import newUserFactory from '../utils/defaultUserFactory';

const newUser = newUserFactory();

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
      state.loggedIn = false;
    },
    updateAge: (state, action) => {
      state.age = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
    updateBasedOnAuth: (state, action) => {
      state.loggedIn = action.payload;
    },
    updateBasedOnFireBase: (state) => {
      state.loggedIn = isUserSignedIn();
    },
  },
});

export const checkLocalUser = (state) => ({ ...state.userStatus });
export const checkLocalUserSignedIn = (state) => state.userStatus.loggedIn;

export const {
  signInLocalUser,
  signOutLocalUser,
  logState,
  updateBasedOnAuth,
  updateBasedOnFireBase,
} = userSlice.actions;

export default userSlice.reducer;
