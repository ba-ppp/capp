import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "toggle",
  initialState: {
    userId: "" as string,
  },
  reducers: {
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
  },
});
export const { setUserId } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
