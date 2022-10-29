import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "toggle",
  initialState: {
    userId: "" as string,
    searchTerm: "" as string,
  },
  reducers: {
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
  },
});
export const { setUserId, setSearchTerm } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
