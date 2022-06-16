import { createSlice } from '@reduxjs/toolkit';

export const userStatus = createSlice({
  name: 'counter',
  initialUserObject: {
    loggedIn: false,
    firstName: '',
    lastName: '',
    photos: [],
    usersLiked: [],
    age: 0,
    title: null,
    location: null,

    messagingToken: null,
  },
  reducers: {
    signin: (state) => {
      state.loggedIn = true;
    },
    signOut: (state) => {
      state.loggedIn = false;
    },
    updateAge: (state, action) => {
      state.age = action.payload;
    },
  },
});

export default userStatus.reducers;
