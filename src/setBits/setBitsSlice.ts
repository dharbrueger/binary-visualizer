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
    // flipRightmostInclusiveBits: (state) => {
    //   if (state.decimal === 0) return;
    //   state.decimal -= 1;
    //   state.binary = state.decimal.toString(2).padStart(8, "0");
    // },
    // unsetRightmostInclusiveBits: (state) => {
    //   if (state.decimal === 0) return;
    //   state.decimal &= state.decimal - 1;
    //   state.binary = state.decimal.toString(2).padStart(8, "0");
    // },
    updateBinary: (state, action: PayloadAction<{ binary: string; signed: boolean; }>) => {
      const { binary, signed } = action.payload;
      state.binary = binary;
    
      let decimalValue = parseInt(binary, 2);
      if (signed && binary[0] === "1") {
        const invertedBinary = binary
          .split("")
          .map((bit) => (bit === "1" ? "0" : "1"))
          .join("");
        decimalValue = -(parseInt(invertedBinary, 2) + 1);
      }
    
      state.decimal = decimalValue;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  // flipRightmostInclusiveBits,
  // unsetRightmostInclusiveBits,
  updateBinary,
  resetState,
} = setBitSlice.actions;

export const selectBinary = (state: RootState) => state.setBit.binary;
export const selectValue = (state: RootState) => state.setBit.decimal;

export default setBitSlice.reducer;
