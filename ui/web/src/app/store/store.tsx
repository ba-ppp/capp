import { configureStore } from "@reduxjs/toolkit";

import toggleReducer from 'app/slices/toggleSlice';

export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;