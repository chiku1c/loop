import { configureStore } from '@reduxjs/toolkit';
import csvReducer from './csvReducer';

export const store = configureStore({
  reducer: {
    csv: csvReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
