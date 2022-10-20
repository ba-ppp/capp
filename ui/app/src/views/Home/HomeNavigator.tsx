import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet/lib/typescript/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import LanguageModal from '../../components/LanguageModal';
import { color } from '../../constants/constants';
import { addImage } from '../../redux/imageSlice';
import { RootState, store } from '../../redux/store';
import { openLibrary } from '../../utils';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

const EmptyScreenComponent = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate('Home');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return <View />;
};
const CameraButton = ({ navigation }) => {
  const styles = StyleSheet.create({
    icon: {
      height: 30,
      width: 30,
    },
    container: {
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.push('Camera')}>
        <Image
          source={require('../../../assets/camera_icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeNavigator = ({ navigation }) => {
  const homeIcon = require('../../../assets/home_icon.png');
  const cameraIcon = require('../../../assets/camera_icon.png');
  const searchIcon = require('../../../assets/search.png');
  const waiting = useSelector((state: RootState) => state.waiting);
  const globalImages = useSelector((state: RootState) => state.images);
  const [images, setImages] = useState(globalImages);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const screenOptions = ({ route }) => ({
    tabBarStyle: styles.tabBar,
    tabBarIcon: () => {
      let iconSize = 30;
      if (route.name === 'Home') {
        return (
          <TouchableOpacity onPress={openLibrary}>
            <View style={styles.addButton}>
              <Text style={styles.plus}>+</Text>
            </View>
          </TouchableOpacity>
        );
      } else if (route.name === 'Camera') {
        return (
          <Image
            style={{ width: iconSize, height: iconSize }}
            source={cameraIcon}
          />
        );
      }
    },
    tabBarActiveTintColor: 'gray',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
    tabBarShowLabel: false,
  });
  //catch global
  useEffect(() => {
    setImages(globalImages);
    setSearchText('');
  }, [globalImages]);

  // handle search
  const handleSearch = () => {

  };
  return (
    <>
      {waiting > 0 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator style={styles.loading} size={'large'} />
        </View>
      )}
      {/* Search button */}
      {images.length > 0 && !waiting && (
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => setShowModal(true)}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      )}
      <Modal transparent={true} visible={showModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.modalCenter]}>
          <Pressable
            onPress={() => setShowModal(false)}
            style={styles.modalScreen}
          />
          <View style={styles.modal}>
            <TextInput
              onChangeText={setSearchText}
              placeholder="Search images"
              value={searchText}
            />
            <Button onPress={handleSearch} title="search" />
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* Tab navigator */}
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Tab.Screen
          name="Language"
          component={EmptyScreenComponent}
          options={{
            tabBarButton: () => <LanguageModal />,
          }}
        />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Camera"
          component={EmptyScreenComponent}
          options={{
            tabBarButton: () => <CameraButton navigation={navigation} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  modalCenter: {
    zIndex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
  },
  loading: {
    backgroundColor: color.antiFlashWhite,
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: windowHeight / 10,
    zIndex: 2,
    width: windowWidth,
    paddingBottom: 10,
    alignItems: 'center',
  },
  modalScreen: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: color.black,
    position: 'absolute',
    opacity: 0.5,
    top: 0,
    left: 0,
  },
  tabBar: {
    height: windowHeight / 10,
    paddingHorizontal: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addButton: {
    borderRadius: 1000,
    backgroundColor: color.violetBlue,
    height: 50,
    width: 50,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  plus: {
    color: color.white,
    fontSize: windowHeight / 10 - 40 + 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: 50,
    width: windowWidth,
    backgroundColor: color.white,
    zIndex: 10,
  },
  searchBtn: {
    backgroundColor: color.white,
    height: 60,
    width: 60,
    position: 'absolute',
    right: 30,
    bottom: windowHeight / 10 + 50,
    zIndex: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    height: 60,
    width: 60,
  },
});

export default HomeNavigator;
