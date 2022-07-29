import { useIsFocused } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Button, Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { color } from '../../constants/color';

const MyCamera = () => {
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

  // const [showCamera, setShowCamera] = useState(false);

  const mytest = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    if (cameraPermission === 'denied') {
      await Linking.openSettings();
    }
  };
  mytest();

  async function getCameraPermission() {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    return cameraPermission;
  }

  async function requestCameraPermission() {
    try {
      const newCameraPermission = await Camera.requestCameraPermission();
    } catch (error) {
      console.error(error);
    }
  }
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
      <Camera
        style={[StyleSheet.absoluteFill, styles.camera]}
        device={device}
        isActive={isFocused}
        photo={true}
        ref={camera}
      />
      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../../../assets/camera_icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MyCamera;