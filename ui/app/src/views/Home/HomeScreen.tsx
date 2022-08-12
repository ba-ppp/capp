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
  Button,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import { color } from '../../constants/color';
import { Dropdown } from 'react-native-element-dropdown';
import { SelectCountry } from 'react-native-element-dropdown';

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
      marginBottom: 10,
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
      backgroundColor: 'white',
      borderRadius: 10,
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
      width: windowWidth / 2.3,
      textAlign: 'center',
      flexGrow: 1,
    },
    header: {
      justifyContent: 'center',
      height: 70,
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
    dropDown: {
      width: windowWidth / 2.3 - 46,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    dropDownText: {
      fontSize: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropDownBox: {
      width: windowWidth / 2.3 - 46,
      fontSize: 16,
      justifyContent: 'center',
    },
    dropDownBoxText: {
      fontSize: 16,
    },
    dropDownIcon: {
      width: 36,
      marginRight: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    dropDownBoxIcon: {
      resizeMode: 'contain',
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

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [country, setCountry] = useState('1');

  const imageList = (
    <ScrollView style={styles.scrollView}>
      <View style={styles.listItemContainer}>
        {images?.length
          ? images.map(imageObject => {
              return (
                <View key={imageObject.uri} style={styles.imageItemContainer}>
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
                    {/* <Pressable
                    onPress={() => {
                      Alert.alert('Read aloud caption!');
                    }}>
                    <Image
                      style={styles.volumeIcon}
                      source={require('../../../assets/volume_icon.png')}
                    />
                  </Pressable> */}

                    <SelectCountry
                      style={styles.dropDownIcon}
                      imageStyle={styles.icon}
                      iconStyle={styles.icon}
                      maxHeight={200}
                      valueField="value"
                      labelField="lable"
                      imageField="image"
                      placeholder=""
                      onChange={e => {
                        setCountry(e.value);
                      }}
                      renderRightIcon={() => (
                        <Image
                          style={styles.icon}
                          source={require('../../../assets/menu.png')}
                        />
                      )}
                      data={[
                        {
                          value: '1',
                          lable: '',
                          image: require('../../../assets/volume_icon.png'),
                        },
                        {
                          value: '2',
                          lable: '',
                          image: require('../../../assets/download.png'),
                        },
                      ]}
                    />

                    <Dropdown
                      style={styles.dropDown}
                      placeholder="Hello! This is a caption a caption a caption a caption a caption!"
                      placeholderStyle={styles.dropDownText}
                      containerStyle={styles.dropDownBox}
                      selectedTextProps={{
                        numberOfLines: 1,
                      }}
                      labelField="label"
                      valueField="value"
                      value={value}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                      selectedTextStyle={styles.dropDownBoxText}
                      data={[
                        {
                          label:
                            'Hello! This is a caption a caption a caption a caption a caption!',
                          value: '1',
                        },
                      ]}
                    />
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
function componentDidMount() {
  throw new Error('Function not implemented.');
}
