import React, { useState, createRef, useRef } from 'react';
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
  Button,
  Clipboard,
  ImageBackground,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import { color } from '../../constants/color';

import ActionSheet from "react-native-actions-sheet";



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
    listItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: "wrap",
    },
    imageItemContainer: {
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: windowWidth / 2.3,
      // backgroundColor: "white",
      // borderRadius: 10,
    },
    image: {
      width: windowWidth / 2.3,
      resizeMode: 'contain',
      flexGrow: 1,
    },
    imageItemFooter: {
      width: windowWidth / 2.3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    icon: {
      height: 22,
      width: 22,
    },
    caption: {
      fontSize: 16,
      width: windowWidth / 2.3 - 10,
      textAlign: 'center',
      flexGrow: 1,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
    },
    header: {
      justifyContent: 'center',
      height: windowHeight / 10,
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
      marginBottom: windowHeight / 10,
    },
    menuStyle: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: 'white'
    },
    captionInfo: {
      fontSize: 20,
      textAlign: 'center',
      padding: 20,
      borderBottomWidth: 1,
    },
    buttonMenu: {
      alignItems: 'center',
      flexDirection: "column",
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    buttonText: {
      fontSize: 20,
      color: '#1E90FF',
    }
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

  const actionSheetRef = useRef<ActionSheet>(null);

  const imageList = (
    <ScrollView style={styles.scrollView}>
      <View style={styles.listItemContainer}>
        {images?.length
          ? images.map(imageObject => {
            return (
              <View key={imageObject.uri} style={styles.imageItemContainer}>

                <ImageBackground
                  resizeMode="contain"
                  source={{
                    uri: 'data:image/png;base64,' + imageObject.base64,
                  }}
                  style={[
                    styles.image,
                    {
                      // height: Math.min(
                      //   imageObject.height,
                      //   (imageObject.height * windowWidth) /
                      //   imageObject.width /
                      //   2,
                      // ),
                    },
                  ]}
                  imageStyle={{
                    width: windowWidth / 2.3,
                    height: windowWidth / 2.3,
                    resizeMode: 'stretch',
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      height: windowWidth / 2.3,
                      width: windowWidth / 2.3,
                      justifyContent: "center",
                      alignItems: 'center',
                    }}
                  >
                  </View>
                </ImageBackground>
                <View style={styles.imageItemFooter}>
                  <TouchableOpacity
                    onPress={() => {
                      actionSheetRef.current?.setModalVisible();
                    }}
                  >
                    <Text numberOfLines={1} style={styles.caption}>
                      This is a caption a caption a caption a caption!
                    </Text>
                  </TouchableOpacity>
                </View>
                <ActionSheet
                  ref={actionSheetRef}
                  statusBarTranslucent
                  bounceOnOpen={true}
                  drawUnderStatusBar={true}
                  bounciness={4}
                  gestureEnabled={true}
                  defaultOverlayOpacity={0.3}
                  containerStyle={styles.menuStyle}
                  indicatorStyle={{ backgroundColor: 'black' }}
                >
                  <View>
                    <Text style={styles.captionInfo}>
                      This is a caption a caption a caption a caption!
                    </Text>
                    <View style={[
                      styles.buttonMenu,
                      {borderBottomWidth: 1,},
                    ]}>
                      <Pressable
                        style={styles.button}
                        onPress={() => {
                          Alert.alert('Read aloud caption!');
                        }}>

                        <Text style={styles.buttonText}>Volume</Text>
                      </Pressable>
                    </View>
                    <View style={styles.buttonMenu }>
                      <Pressable
                        style={styles.button}
                        onPress={() => {
                          Clipboard.setString("This is a caption a caption a caption a caption!");
                          actionSheetRef.current?.hide();
                        }}>

                        <Text style={styles.buttonText}>Copy</Text>
                      </Pressable>
                    </View>
                  </View>

                </ActionSheet>


              </View>

            );
          })
          : null}
      </View>
    </ScrollView >
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