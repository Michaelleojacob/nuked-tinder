import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './reduxTest';
import { userSlice } from './userState';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    userStatus: userSlice.reducer,
  },
});

export default store;
