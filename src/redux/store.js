import { configureStore } from '@reduxjs/toolkit';
import DataSlice from './slice';

export const store = configureStore({
  reducer: {
    store: DataSlice,
  },
});
