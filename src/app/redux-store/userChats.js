import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { app, db } from './../firebase-utils/firebase';

export const userChats = createSlice({
  name: 'userChats',
  initialState: {
    arr: [],
  },
  reducers: {
    updateChatArray: (state, action) => {
      console.log('this reducer was called');
      state.arr = [...action.payload];
    },
  },
});
export const localUserChats = (state) => state.userChats;

export const { updateChatArray } = userChats.actions;

export default userChats.reducer;
