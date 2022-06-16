import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './reduxTest';

// export const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//   },
// });

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
