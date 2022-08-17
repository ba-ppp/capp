import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "toggle",
  initialState: {
    userId: "" as string,
    searchText: "" as string,
  },
  reducers: {
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
    setSearchText: (state, { payload }: PayloadAction<string>) => {
      state.searchText = payload;
    },
  },
});
export const { setUserId, setSearchText } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
