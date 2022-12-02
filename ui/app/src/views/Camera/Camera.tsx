import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevices,
} from 'react-native-vision-camera';
import {
  color,
  HEIGHT,
  SERVER_URL,
  USER_ID_CAMERA,
  WIDTH,
} from '../../constants/constants';
import { Client, Message } from 'react-native-paho-mqtt';
import Tts from 'react-native-tts';
import { RootState, store } from '../../redux/store';
import { decWaiting, incWaiting } from '../../redux/waitingSlice';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useSelector } from 'react-redux';
const MyCamera = ({ navigation }) => {
  // state
  const [pathState, setPathState] = useState('');
  const [caption, setCaption] = useState('');
  const language = useSelector((state: RootState) => state.language);
  Tts.setDefaultLanguage(language === 'en' ? 'en-US' : 'vi-VN');
  Tts.addEventListener('tts-finish', event => {
    setTimeout(() => {
      setPathState('');
      setCaption('');
      actionSheetRef.current?.hide(null);
    }, 500);
  });
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const cameraIcon = require('../../../assets/camera_icon.png');
  const myStorage: any = {
    setItem: (key: string, item: any) => {
      myStorage[key] = item;
    },
    getItem: (key: string): any => myStorage[key],
    removeItem: (key: string) => {
      delete myStorage[key];
    },
  };
  // style
  const styles = StyleSheet.create({
    icon: {
      height: 30,
      width: 30,
    },
    button: {
      height: 70,
      width: 70,
      backgroundColor: color.white,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    loading: {
      backgroundColor: color.antiFlashWhite,
      width: 50,
      height: 50,
      borderRadius: 500,
    },
    menuStyle: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: 'white',
    },
    loadingContainer: {
      position: 'absolute',
      bottom: HEIGHT / 10,
      zIndex: 2,
      width: WIDTH,
      paddingBottom: 10,
      alignItems: 'center',
      display: caption === '' ? 'flex' : 'none',
    },
    captionInfo: {
      fontSize: 20,
      textAlign: 'center',
      padding: 20,
      borderBottomWidth: 1,
    },
  });

  //check and request camera permission
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission !== 'authorized') {
        Camera.requestCameraPermission().then(
          res => res === 'denied' && navigation.pop(),
        );
      }
    })();
  }, []);
  //create form data
  const createFormData = (image: PhotoFile) => {
    const data = new FormData();
    let path = 'file://'.concat(image.path);
    path = Platform.OS === 'ios' ? path?.replace('file://', '') : path;
    setPathState(path);
    data.append('file', {
      name: 'photo.jpg',
      type: 'image/jpg',
      uri: path,
    });
    data.append('relativePath', null);
    return data;
  };

  //upload function
  const upload = (image: PhotoFile) => {
    store.dispatch(incWaiting());
    fetch(`http://${SERVER_URL}:8000/upload?user_id=${USER_ID_CAMERA}`, {
      method: 'POST',
      body: createFormData(image),
    })
      .catch(error => {
        console.log('error', error);
      })
      .finally(() => store.dispatch(decWaiting()));
  };
  // speak
  useEffect(() => {
    if (caption !== '') {
      actionSheetRef.current?.show();
      Tts.speak(caption);
    }
  }, [caption]);

  // Connect Socket
  useEffect(() => {
    const client = new Client({
      uri: `ws://${SERVER_URL}:8083/mqtt`,
      clientId: USER_ID_CAMERA,
      storage: myStorage,
    });
    // set event handlers
    client.on('connectionLost', (responseObject: any) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject);
      }
    });
    client.on('messageReceived', (message: any) => {
      const data = JSON.parse(message.payloadString);
      setCaption(language === 'en' ? data.caption : data.captionVietnamese);
    });
    // connect the client
    client
      .connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect');
        return client.subscribe(`captions/${USER_ID_CAMERA}`);
      })
      .catch((responseObject: any) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      });
  }, []);

  // take photo
  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({
      enableAutoStabilization: true,
    });
    upload(photo);
  };

  // requestCameraPermission();
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  if (device == null) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.container}>
      {pathState === '' ? (
        <>
          <Camera
            style={[StyleSheet.absoluteFill, styles.camera]}
            device={device}
            isActive={isFocused}
            photo={true}
            ref={camera}
          />
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Image source={cameraIcon} style={styles.icon} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image
            source={{ uri: pathState }}
            style={{ width: WIDTH, height: HEIGHT }}
          />
          <View style={styles.loadingContainer}>
            <ActivityIndicator style={styles.loading} size={'large'} />
          </View>
        </>
      )}
      <ActionSheet
        ref={actionSheetRef}
        statusBarTranslucent
        drawUnderStatusBar={true}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}
        containerStyle={styles.menuStyle}
        indicatorStyle={{ backgroundColor: 'black' }}>
        <View>
          <Text style={styles.captionInfo}>{caption}</Text>
        </View>
      </ActionSheet>
    </View>
  );
};

export default MyCamera;
