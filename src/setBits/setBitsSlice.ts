import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface SetBitState {
  binary: string;
  decimal: number;
}

const initialState: SetBitState = {
  binary: "00000000",
  decimal: 0,
};

export const setBitSlice = createSlice({
  name: "setBit",
  initialState,
  reducers: {
    flipRightmostInclusiveBits: (state) => {
      if (state.decimal === 0) return;
      state.decimal -= 1;
      state.binary = state.decimal.toString(2).padStart(8, "0");
    },
    unsetRightmostInclusiveBits: (state) => {
      if (state.decimal === 0) return;
      state.decimal &= state.decimal - 1;
      state.binary = state.decimal.toString(2).padStart(8, "0");
    },
    updateBinary: (state, action: PayloadAction<string>) => {
      state.binary = action.payload;
      state.decimal = parseInt(action.payload, 2);
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  flipRightmostInclusiveBits,
  unsetRightmostInclusiveBits,
  updateBinary,
  resetState,
} = setBitSlice.actions;

export const selectBinary = (state: RootState) => state.setBit.binary;
export const selectValue = (state: RootState) => state.setBit.decimal;

export default setBitSlice.reducer;
