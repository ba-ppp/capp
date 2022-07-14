import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isOpenSlideBar: false as boolean,
    hasMenuSelect: false as boolean,
    isLoading: false as boolean,
}


const ToggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        toggleSlideBar: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpenSlideBar = payload;
        },
        toggleMenuSelect: (state, { payload }: PayloadAction<boolean>) => {
            state.hasMenuSelect = payload;
        },
        toggleLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
    },
});
export const { toggleSlideBar, toggleMenuSelect, toggleLoading } =
    ToggleSlice.actions;

export default ToggleSlice.reducer;
