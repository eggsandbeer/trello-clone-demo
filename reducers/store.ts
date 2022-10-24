import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import lanesReducer from './lanesSlice';

export const store = configureStore({
  reducer: {
    lanes: lanesReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
