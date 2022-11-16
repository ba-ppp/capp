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
  ActionSheetIOS,
  Platform,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import { useSelector } from 'react-redux';
import { color, HEIGHT, WIDTH } from '../constants/constants';
import { deleteImage, ImageType } from '../redux/imageSlice';
import { RootState, store } from '../redux/store';

interface selectedImageType {
  item?: ImageType;
  index?: Number;
}

const ImageList = ({ images }: { images: ImageType }) => {
  // style
  const styles = StyleSheet.create({
    bottomSpace: {
      minHeight: HEIGHT / 10,
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
      width: WIDTH / 2.3,
      height: WIDTH / 2.3,
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
      width: WIDTH / 2.3,
    },
    buttonText: {
      fontSize: 20,
      color: '#1E90FF',
    },
    imageItemFooter: {
      width: WIDTH / 2.3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    caption: {
      fontSize: 16,
      width: WIDTH / 2.3 - 10,
      textAlign: 'center',
      flexGrow: 1,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
    },
  });
  //variable & state
  Tts.voices()
    .then(voices => console.log(voices))
    .catch(err => console.log('voice err'));
  const language = useSelector((state: RootState) => state.language);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedImage, setSelectedImage] = useState<selectedImageType>({});
  Tts.setDefaultLanguage(language === 'en' ? 'en-US' : 'vi-VN');
  //get display caption
  const getDisplayCaption = (imageObj: ImageType) => {
    return language === 'vi' ? imageObj?.vcaption : imageObj?.caption;
  };
  //image item
  const imageItem = ({ item, index }: { item: ImageType; index: Number }) => (
    <TouchableOpacity
      key={item.uri}
      // onPress={onPress}
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
            {getDisplayCaption(item) || 'Loading ...'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  //render
  return (
    <ScrollView>
      <FlatList data={images} renderItem={imageItem} numColumns={2} />
      <View style={styles.bottomSpace} />
      
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
          <Text style={styles.captionInfo}>
            {getDisplayCaption(selectedImage.item as ImageType)}
          </Text>
          <View style={[styles.buttonMenu, { borderBottomWidth: 1 }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!selectedImage) {
                  return;
                }
                Tts.speak(
                  getDisplayCaption(selectedImage.item as ImageType) as string,
                );
              }}>
              <Text style={styles.buttonText}>Volume</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonMenu, { borderBottomWidth: 1 }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Clipboard.setString(
                  getDisplayCaption(selectedImage.item as ImageType),
                );
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
    </ScrollView>
  );
};

export default ImageList;
