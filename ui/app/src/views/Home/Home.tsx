import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MyButton from '../../components/MyButton';
import { color } from '../../constants/color';

const Home = () => {
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
    imageItemContainer: {
      marginBottom: 20,
      marginTop: 20,
    },
    image: {
      width: windowWidth,
      resizeMode: 'contain',
    },
    imageItemFooter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    volumeIcon: {
      height: 24,
      width: 24,
    },
    caption: {
      fontSize: 22,
    },
    header: {
      alignItems: 'center',
      paddingBottom: 5,
      elevation: 1,
      backgroundColor: color.white,
    },
    headerLogo: {
      resizeMode: 'cover',
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

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image
          style={styles.headerLogo}
          source={require('../../../assets/Index.png')}
        />
      </View>
      <Text style={styles.title}>Image Captioning Generator</Text>
      <MyButton onPress={openLibrary} width={'100%'}>
        <Text style={styles.btnText}>Select image from library</Text>
      </MyButton>
      <View>
        {images?.length
          ? images.map(imageObject => {
              return (
                <View key={imageObject.uri} style={styles.imageItemContainer}>
                  <Image
                    // resizeMode="contain"
                    source={{
                      uri: 'data:image/png;base64,' + imageObject.base64,
                    }}
                    style={[
                      styles.image,
                      {
                        height: Math.min(
                          imageObject.height,
                          (imageObject.height * windowWidth) /
                            imageObject.width,
                        ),
                      },
                    ]}
                  />
                  <MyButton
                    width={150}
                    onPress={() => {
                      Alert.alert('Download audio file!');
                    }}>
                    <Text style={{ color: color.white }}>
                      Download audio file
                    </Text>
                  </MyButton>
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
};

export default Home;
