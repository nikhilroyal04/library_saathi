import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './librarySlice';
import libraryLeadReducer from './libraryLeadSlice';
import leadReducer from './leadSlice';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    libraryLead: libraryLeadReducer,
    lead: leadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;