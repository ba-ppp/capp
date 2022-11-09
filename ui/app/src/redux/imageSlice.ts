import { SERVER_URL, USER_ID } from './../constants/constants';
import { createSlice } from '@reduxjs/toolkit';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { Platform } from 'react-native';

export interface ImageType extends Asset {
  server_id: String | undefined;
  caption: String | undefined;
  vcaption: String | undefined;
}

const initialState: Array<ImageType> = [];
// const initialState: Array<Number> = [];

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, image) => {
      state.push(image.payload);
    },
    deleteImage: (state, index) => {
      state.splice(index.payload, 1);
    },
    clearImage: state => {
      return [];
    },
    addCaption: (state, info) => {
      const caption = info.payload.caption;
      const server_id = info.payload.server_id;
      const vcaption = info.payload.vcaption;
      const index = state.findIndex(item => item.server_id === server_id);
      if (index !== -1) {
        state[index].caption = caption;
        state[index].vcaption = vcaption;
        return state;
      }
    },
  },
});

export const { addImage, deleteImage, clearImage, addCaption } =
  imageSlice.actions;

export default imageSlice.reducer;
