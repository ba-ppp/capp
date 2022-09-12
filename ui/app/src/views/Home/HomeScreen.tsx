import React, { useState, createRef, useRef, useEffect } from 'react';
import { Client, Message } from 'react-native-paho-mqtt';
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
  FlatList,
} from 'react-native';
import { color, USER_ID, SERVER_URL } from '../../constants/constants';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { RootState, store } from '../../redux/store';
import { useSelector } from 'react-redux';
import { openLibrary } from '../../utils';
import {
  addCaption,
  clearImage,
  deleteImage,
  ImageType,
} from '../../redux/imageSlice';
import Tts from 'react-native-tts';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface selectedImageType {
  item?: ImageType;
  index?: Number;
}

const HomeScreen = () => {
  const images = useSelector((state: RootState) => state.images);
  const [selectedImage, setSelectedImage] = useState<selectedImageType>({});
  const actionSheetRef = useRef<ActionSheetRef>(null);
  Tts.setDefaultLanguage('en-US');
  //Set up an in-memory alternative to global localStorage
  const myStorage: any = {
    setItem: (key: string, item: any) => {
      myStorage[key] = item;
    },
    getItem: (key: string): any => myStorage[key],
    removeItem: (key: string) => {
      delete myStorage[key];
    },
  };
  // upload screen
  const uploadScreen = (
    <TouchableOpacity onPress={openLibrary} style={styles.uploadScreen}>
      <Text style={styles.plus}>+</Text>
      <Text>Upload image</Text>
    </TouchableOpacity>
  );
  // create form data

  // Connect Socket
  useEffect(() => {
    const client = new Client({
      uri: `ws://${SERVER_URL}:8083/mqtt`,
      clientId: USER_ID,
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
      store.dispatch(addCaption({ caption: data.caption, server_id: data.id }));
    });
    // connect the client
    client
      .connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect');
        return client.subscribe(`captions/${USER_ID}`);
      })
      .catch((responseObject: any) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      });
  }, []);

  // image list component
  const imageItem = ({ item, index }: { item: ImageType; index: Number }) => (
    <TouchableOpacity
      key={item.uri}
      onPress={() => {
        actionSheetRef.current?.show();
        setSelectedImage({ item, index });
      }}>
      <View key={item.uri} style={styles.imageItemContainer}>
        <ImageBackground
          resizeMode="contain"
          source={{
            uri: item.uri,
          }}
          style={[styles.image]}
          imageStyle={styles.image}
        />
        <View style={styles.imageItemFooter}>
          <Text numberOfLines={1} style={styles.caption}>
            {item?.caption}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  // render
  return (
    <View>
      <View style={styles.header}>
        {images.length === 0 ? (
          <Image
            style={styles.headerLogo}
            source={require('../../../assets/Index.png')}
          />
        ) : (
          <TouchableOpacity onPress={() => store.dispatch(clearImage())}>
            <Text style={styles.clearAllText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>
      {images?.length ? (
        <FlatList
          style={styles.scrollView}
          data={images}
          renderItem={imageItem}
          numColumns={2}
        />
      ) : (
        uploadScreen
      )}
      {/* Action sheet */}
      <ActionSheet
        ref={actionSheetRef}
        statusBarTranslucent
        drawUnderStatusBar={true}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}
        containerStyle={styles.menuStyle}
        indicatorStyle={{ backgroundColor: 'black' }}>
        <View>
          <Text style={styles.captionInfo}>{selectedImage.item?.caption}</Text>
          <View style={[styles.buttonMenu, { borderBottomWidth: 1 }]}>
            <Pressable
              style={styles.button}
              onPress={() => {
                Tts.speak(selectedImage.item?.caption as string);
              }}>
              <Text style={styles.buttonText}>Volume</Text>
            </Pressable>
          </View>
          <View style={[styles.buttonMenu, { borderBottomWidth: 1 }]}>
            <Pressable
              style={styles.button}
              onPress={() => {
                Clipboard.setString(
                  (selectedImage.item?.caption as String) && '',
                );
                actionSheetRef.current?.hide(null);
              }}>
              <Text style={styles.buttonText}>Copy</Text>
            </Pressable>
          </View>
          <View style={[styles.buttonMenu, { borderBottomWidth: 1 }]}>
            <Pressable
              style={styles.button}
              onPress={() => {
                store.dispatch(deleteImage(selectedImage.index));
                actionSheetRef.current?.hide(null);
              }}>
              <Text style={[styles.buttonText, styles.clearAllText]}>
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  clearAllText: {
    color: color.red,
  },
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
    flexWrap: 'wrap',
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
    height: windowWidth / 2.3,
    resizeMode: 'stretch',
    borderRadius: 10,
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
    backgroundColor: 'white',
  },
  captionInfo: {
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  buttonMenu: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#1E90FF',
  },
});

export default HomeScreen;
