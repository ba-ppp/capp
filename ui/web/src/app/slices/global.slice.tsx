import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "enums/enums";

const globalSlice = createSlice({
  name: "toggle",
  initialState: {
    userId: "" as string,
    activeLanguage: Language.ENGLISH,
    searchTerm: "" as string,
  },
  reducers: {
    setUserId: (state, { payload }: PayloadAction<string>) => {
      state.userId = payload;
    },
    setActiveLanguage: (state, { payload }: PayloadAction<Language>) => {
      state.activeLanguage = payload;
    },
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
  },
});
export const { setUserId, setSearchTerm, setActiveLanguage } =
  globalSlice.actions;

export const globalReducer = globalSlice.reducer;
