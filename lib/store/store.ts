import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './librarySlice';
import leadReducer from './leadSlice';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    lead: leadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;