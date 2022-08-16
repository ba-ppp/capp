import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "app/slices/global.slice";
import { libraryReducer } from "app/slices/library.slice";

import toggleReducer from "app/slices/toggleSlice";

export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        global: globalReducer,
        library: libraryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
