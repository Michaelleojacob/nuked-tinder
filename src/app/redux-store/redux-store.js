import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userState';

export const store = configureStore({
  reducer: {
    userStatus: userSlice.reducer,
  },
});

export default store;

//counter slice for was testing. leaving this here for now

// import { counterSlice } from './reduxTest';
// import { configureStore } from '@reduxjs/toolkit';
// import { userSlice } from './userState';

// export const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//     userStatus: userSlice.reducer,
//   },
// });

// export default store;
