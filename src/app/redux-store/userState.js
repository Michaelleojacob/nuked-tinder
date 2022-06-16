import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userStatus',
  initialState: {
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
  },
});

// export const checkUserData = (state) => state;

export const currentUserStatus = (state) => state.userStatus.loggedIn;

export const { signInUser, signOutUser, logState } = userSlice.actions;

export default userSlice.reducer;
