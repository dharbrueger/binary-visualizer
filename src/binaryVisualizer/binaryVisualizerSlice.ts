import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface BinaryVisualizerState {
  binary: string;
  decimal: string;
}

const initialState: BinaryVisualizerState = {
  binary: "00000000",
  decimal: "0",
};

export const binaryVisualizerSlice = createSlice({
  name: "binaryVisualizer",
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
    
      state.decimal = decimalValue.toString();
    },
    updateDecimal: (state, action: PayloadAction<{ decimal: string; signed: boolean; }>) => {
      const { decimal, signed } = action.payload;
      state.decimal = decimal;
    
      const decimalValue = parseInt(decimal);
      if (isNaN(decimalValue)) {
        state.binary = "00000000";
      } else if (signed && decimalValue < 0) {
        const binary = (decimalValue & 0xFF).toString(2).padStart(8, "0");
        state.binary = binary;
      } else {
        state.binary = decimalValue.toString(2).padStart(8, "0");
      }
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
  updateDecimal,
  resetState,
} = binaryVisualizerSlice.actions;

export const selectBinary = (state: RootState) => state.binaryVisualizer.binary;
export const selectValue = (state: RootState) => state.binaryVisualizer.decimal;

export default binaryVisualizerSlice.reducer;
