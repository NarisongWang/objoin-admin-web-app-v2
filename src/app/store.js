import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import systemReducer from '../features/system/systemSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    system: systemReducer,
  },
});
