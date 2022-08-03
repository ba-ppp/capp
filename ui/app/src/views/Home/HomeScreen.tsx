import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import { color } from '../../constants/color';

const HomeScreen = () => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [images, setImages] = useState<Array<any>>([]);
  const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 30,
    },
    btnText: {
      color: color.white,
    },
    listItemContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      flexWrap: "wrap",
      
    },
    imageItemContainer: {
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: windowWidth/2.3,
      backgroundColor: "white",
      borderRadius: 20,
    },
    image: {
      width: windowWidth/2.5,
      resizeMode: 'contain',
      flexGrow: 1
    },
    imageItemFooter: {
      flex: 0,
      width: windowWidth/2.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    volumeIcon: {
      height: 24,
      width: 24,
    },
    caption: {
      fontSize: 22,
    },
    header: {
      justifyContent: 'center',
      height: 100,
      alignItems: 'center',
      paddingBottom: 5,
      elevation: 1,
      backgroundColor: color.white,
    },
    headerLogo: {
      resizeMode: 'contain',
      height: 50,
    },
    uploadScreen: {
      backgroundColor: color.antiFlashWhite,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      zIndex: -1,
      height: windowHeight,
      width: windowWidth,
    },
    plus: {
      fontSize: 60,
    },
    scrollView: {
      marginBottom: 100,
    },
  });

  const openLibrary = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 0,
    }).then(res => {
      if (!res) {
        return;
      }
      setImages(res.assets as Array<any>);
    });
  };

  const uploadScreen = (
    <TouchableOpacity onPress={openLibrary} style={styles.uploadScreen}>
      <Text style={styles.plus}>+</Text>
      <Text>Upload image</Text>
    </TouchableOpacity>
  );

  const imageList = (
    <ScrollView style={styles.scrollView}>
      <View style = {styles.listItemContainer}>
      {images?.length
        ? images.map(imageObject => {
            return (
              <View key={imageObject.uri} style={styles.imageItemContainer }>
                <Image
                  resizeMode="contain"
                  source={{
                    uri: 'data:image/png;base64,' + imageObject.base64,
                  }}
                  style={[
                    styles.image,
                    {
                      height: Math.min(
                        imageObject.height,
                        (imageObject.height * windowWidth) /
                          imageObject.width /
                          2,
                      ),
                    },
                  ]}
                />
                <View style={styles.imageItemFooter}>
                  <Pressable
                    onPress={() => {
                      Alert.alert('Read aloud caption!');
                    }}>
                    <Image
                      style={styles.volumeIcon}
                      source={require('../../../assets/volume_icon.png')}
                    />
                  </Pressable>
                  <Text style={styles.caption}>Caption</Text>
                </View>
              </View>
            );
          })
        : null}
        </View> 
   </ScrollView>
  );

  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.headerLogo}
          source={require('../../../assets/Index.png')}
        />
      </View>
      {images?.length ? imageList : uploadScreen}
    </View>
  );
};

export default HomeScreen;
