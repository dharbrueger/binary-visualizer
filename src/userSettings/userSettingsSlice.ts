import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface UserSettingsState {
  displayPlaceValues: boolean;
  signed: boolean;
}

const initialState: UserSettingsState = {
  displayPlaceValues: true,
  signed: false,
};

export const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    setDisplayPlaceValues: (state, action: PayloadAction<boolean>) => {
      state.displayPlaceValues = action.payload;
    },
    setSigned: (state, action: PayloadAction<boolean>) => {
      state.signed = action.payload;
    },
  },
});

export const {
  setDisplayPlaceValues,
  setSigned,
} = userSettingsSlice.actions;

export const selectDisplayPlaceValues = (state: RootState) =>
  state.userSettings.displayPlaceValues;
export const selectSigned = (state: RootState) => state.userSettings.signed;

export default userSettingsSlice.reducer;
