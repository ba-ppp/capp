import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IThumbnailItem } from "types/utils.types";

const librarySlice = createSlice({
  name: "library",
  initialState: {
    items: [] as IThumbnailItem[],
  },
  reducers: {
    addThumbnailItem: (state, action: PayloadAction<IThumbnailItem>) => {
      state.items.push(action.payload);
    },
    modifyThumbnailItem: (state, action: PayloadAction<IThumbnailItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = {...state.items[index], ...action.payload};
    },
  },
});
export const { addThumbnailItem, modifyThumbnailItem } = librarySlice.actions;

export const libraryReducer = librarySlice.reducer;
