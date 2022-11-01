import Clipboard from '@react-native-clipboard/clipboard';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Tts from 'react-native-tts';
import { color } from '../constants/constants';
import { deleteImage, ImageType } from '../redux/imageSlice';
import { store } from '../redux/store';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface selectedImageType {
  item?: ImageType;
  index?: Number;
}

const ImageList = ({ images }: { images: ImageType }) => {
  // style
  const styles = StyleSheet.create({
    imageList: {
      marginBottom: windowHeight / 10,
    },
    actionSheet: {
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
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    buttonMenu: {
      alignItems: 'center',
      flexDirection: 'column',
    },
    image: {
      width: windowWidth / 2.3,
      height: windowWidth / 2.3,
      // resizeMode: 'stretch',
      borderRadius: 10,
    },
    clearAllText: {
      color: color.red,
    },
    imageItemContainer: {
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: windowWidth / 2.3,
    },
    buttonText: {
      fontSize: 20,
      color: '#1E90FF',
    },
    imageItemFooter: {
      width: windowWidth / 2.3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
  });
  //variable & state
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedImage, setSelectedImage] = useState<selectedImageType>({});
  Tts.setDefaultLanguage('en-US');
  //image item
  const imageItem = ({ item, index }: { item: ImageType; index: Number }) => (
    <TouchableOpacity
      key={item.uri}
      onPress={() => {
        actionSheetRef.current?.show();
        setSelectedImage({ item, index });
      }}>
      <View key={item.uri} style={styles.imageItemContainer}>
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: item.uri,
          }}
          style={[styles.image]}
          imageStyle={styles.image}
        />
        <View style={styles.imageItemFooter}>
          <Text numberOfLines={1} style={styles.caption}>
            {item.caption || 'Loading ...'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  //render
  return (
    <>
      <FlatList
        style={styles.imageList}
        data={images}
        renderItem={imageItem}
        numColumns={2}
      />
      {/* Action sheet */}
      <ActionSheet
        ref={actionSheetRef}
        statusBarTranslucent
        drawUnderStatusBar={true}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}
        containerStyle={styles.actionSheet}
        indicatorStyle={{ backgroundColor: 'black' }}>
        <View>
          <Text style={styles.captionInfo}>{selectedImage.item?.caption}</Text>
          <View style={[styles.buttonMenu, { borderBottomWidth: 1 }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Tts.speak(selectedImage.item?.caption as string);
              }}>
              <Text style={styles.buttonText}>Volume</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonMenu, { borderBottomWidth: 1 }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Clipboard.setString(selectedImage.item?.caption as string);
                actionSheetRef.current?.hide(null);
              }}>
              <Text style={styles.buttonText}>Copy</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonMenu, { borderBottomWidth: 1 }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                store.dispatch(deleteImage(selectedImage.index));
                actionSheetRef.current?.hide(null);
              }}>
              <Text style={[styles.buttonText, styles.clearAllText]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>
    </>
  );
};

export default ImageList;
