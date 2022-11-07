import React, { useState, createRef, useRef, useEffect } from 'react';
import { Client, Message } from 'react-native-paho-mqtt';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { color, USER_ID, SERVER_URL } from '../../constants/constants';
import { RootState, store } from '../../redux/store';
import { useSelector } from 'react-redux';
import { openLibrary } from '../../utils';
import { addCaption, clearImage } from '../../redux/imageSlice';
import ImageList from '../../components/ImageList';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styleDot = {
  backgroundColor: '#000000',
  marginRight: 3,
};
const HomeScreen = () => {
  const images = useSelector((state: RootState) => state.images);
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
      {images?.length ? <ImageList images={images} /> : uploadScreen}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  icon: {
    height: 22,
    width: 22,
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
  clearAllText: {
    color: color.red,
  },
});

export default HomeScreen;
