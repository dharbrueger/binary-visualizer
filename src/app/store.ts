import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import setBitReducer from "../setBits/setBitsSlice";
import userSettingsReducer from "../userSettings/userSettingsSlice";

export const store = configureStore({
  reducer: {
    setBit: setBitReducer,
    userSettings: userSettingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
