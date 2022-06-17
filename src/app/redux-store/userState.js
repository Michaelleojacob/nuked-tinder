import { createSlice } from '@reduxjs/toolkit';
import { app, db } from './../firebase-utils/firebase';
import { isUserSignedIn } from './../firebase-utils/auth';

export const userSlice = createSlice({
  name: 'userStatus',
  initialState: {
    loggedIn: isUserSignedIn,
    firstName: '',
    lastName: '',
    photos: [],
    usersLiked: [],
    age: 0,
    title: null,
    location: null,
    messagingToken: null,
    fireBaseToken: null,
  },
  reducers: {
    signInUser: (state) => {
      state.loggedIn = true;
    },
    signOutUser: (state) => {
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
    logState: (state) => {
      console.log(state);
    },
    updateBasedOnAuth: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

// export const checkUserData = (state) => state;

export const currentUserStatus = (state) => state.userStatus.loggedIn;

export const { signInUser, signOutUser, logState, updateBasedOnAuth } =
  userSlice.actions;

export default userSlice.reducer;
