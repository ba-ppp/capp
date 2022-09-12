import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './imageSlice';
import waitingReducer from './waitingSlice';
export const store = configureStore({
  reducer: { images: imagesReducer, waiting: waitingReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
