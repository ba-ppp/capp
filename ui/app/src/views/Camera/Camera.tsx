import { useIsFocused } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { color } from '../../constants/color';

const MyCamera = ({ navigation }) => {
  const styles = StyleSheet.create({
    camera: {
      // maxHeight: 500,
      // zIndex: 5,
      // elevation: 5,
    },
    icon: {
      height: 30,
      width: 30,
    },
    button: {
      height: 50,
      width: 50,
      backgroundColor: color.white,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    container: {
      backgroundColor: 'red',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

  const cameraIcon = require('../../../assets/camera_icon.png');

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

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  if (device == null) {
    return <Text>Loading</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({
      enableAutoStabilization: true,
    });
    console.log(photo);
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default MyCamera;
