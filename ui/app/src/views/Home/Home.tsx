import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MyButton from '../../components/MyButton';
import {color} from '../../constants/color';

const Home = ({navigation}: any) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [images, setImages] = useState<Array<any>>([]);
  const openLibrary = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 0,
    }).then(res => {
      if (!res) return;
      setImages(res.assets as Array<any>);
    });
  };

  return (
    <ScrollView>
      <Text style={{textAlign: 'center', fontSize: 30}}>
        Image Captioning Generator
      </Text>
      <MyButton onPress={openLibrary} width={'100%'}>
        <Text style={{color: color.white}}>Select image from library</Text>
      </MyButton>
      <View>
        {images?.length
          ? images.map(imageObject => {
              console.log({imageObject});
              return (
                <View
                  key={imageObject.uri}
                  style={{marginBottom: 20, marginTop: 20}}>
                  <Image
                    // resizeMode="contain"
                    source={{
                      uri: 'data:image/png;base64,' + imageObject.base64,
                    }}
                    style={{
                      width: windowWidth,
                      height: Math.min(
                        imageObject.height,
                        (imageObject.height * windowWidth) / imageObject.width,
                      ),
                      resizeMode: 'contain',
                    }}
                  />
                  <MyButton
                    width={150}
                    onPress={() => {
                      Alert.alert('Download audio file!');
                    }}>
                    <Text style={{color: color.white}}>
                      Download audio file
                    </Text>
                  </MyButton>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable
                      onPress={() => {
                        Alert.alert('Read aloud caption!');
                      }}>
                      <Image
                        style={{height: 24, width: 24}}
                        source={require('../../../assets/volume_icon.png')}
                      />
                    </Pressable>
                    <Text style={{fontSize: 22}}>Caption</Text>
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
