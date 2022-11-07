import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const waitingSlice = createSlice({
  name: 'waiting',
  initialState,
  reducers: {
    incWaiting: state => state + 1,
    decWaiting: state => state - 1,
  },
});

export const { incWaiting, decWaiting } = waitingSlice.actions;

export default waitingSlice.reducer;
