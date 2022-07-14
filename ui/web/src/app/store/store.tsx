import { configureStore } from "@reduxjs/toolkit";

import toggleReducer from 'app/slices/toggleSlice';
import textContent from 'app/slices/contentSlice';

export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        content: textContent
    },
});

export type RootState = ReturnType<typeof store.getState>;