import { Platform } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { SERVER_URL, USER_ID } from './constants/constants';
import { addImage } from './redux/imageSlice';
import { store } from './redux/store';
import { decWaiting, incWaiting } from './redux/waitingSlice';

const createFormData = (image: Asset) => {
  const data = new FormData();
  data.append('file', {
    name: image.fileName,
    type: image.type,
    uri: Platform.OS === 'ios' ? image.uri?.replace('file://', '') : image.uri,
  });
  data.append('relativePath', null);
  data.append('name', image.fileName);
  data.append('type', image.type);
  return data;
};

const upload = (image: Asset) => {
  store.dispatch(incWaiting());
  fetch(`http://${SERVER_URL}:8000/upload?user_id=${USER_ID}`, {
    method: 'POST',
    body: createFormData(image),
  })
    .then(response => response.json())
    .then(response => {
      console.log('response', response.id);
      store.dispatch(addImage({ ...image, server_id: response.id }));
    })
    .catch(error => {
      console.log('error', error);
    })
    .finally(() => store.dispatch(decWaiting()));
};

export const openLibrary = () => {
  launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 0,
  }).then(res => {
    if (res.assets) {
      res.assets.forEach(item => {
        upload(item);
        // store.dispatch(addImage(item));
      });
    }
  });
};
