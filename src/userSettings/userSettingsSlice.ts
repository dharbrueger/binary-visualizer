import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface UserSettingsState {
  displayPlaceValues: boolean;
}

const initialState: UserSettingsState = {
  displayPlaceValues: true,
};

export const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    toggleDisplayPlaceValues: (state) => {
      state.displayPlaceValues = !state.displayPlaceValues;
    },
    setDisplayPlaceValues: (state, action: PayloadAction<boolean>) => {
      state.displayPlaceValues = action.payload;
    },
  },
});

export const { toggleDisplayPlaceValues, setDisplayPlaceValues } = userSettingsSlice.actions;

export const selectDisplayPlaceValues = (state: RootState) => state.userSettings.displayPlaceValues;

export default userSettingsSlice.reducer;
