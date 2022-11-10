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
import RoundButton from '../../components/RoundButton';
import { color, HEIGHT, WIDTH } from '../../constants/constants';
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
      height: HEIGHT / 20,
      width: HEIGHT / 20,
    },
    container: {
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Image
          source={require('../../../assets/camera_icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const HomeNavigator = ({ navigation }) => {
  const plusIcon = require('../../../assets/white-plus.png');
  const searchIcon = require('../../../assets/search.png');
  const waiting = useSelector((state: RootState) => state.waiting);
  const globalImages = useSelector((state: RootState) => state.images);
  const [images, setImages] = useState(globalImages);
  const [isShowModal, setIsShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const screenOptions = ({ route }) => ({
    tabBarStyle: styles.tabBar,
    tabBarIcon: () => {
      if (route.name === 'Home') {
        return (
          <TouchableOpacity onPress={openLibrary}>
            <View style={styles.addButton}>
              <Image source={plusIcon} style={styles.icon} />
            </View>
          </TouchableOpacity>
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
    if (!searchText) return;
    navigation.push('Search', { searchText: searchText });
    setIsShowModal(false);
  };
  // show modal
  const showModal = () => {
    setIsShowModal(true);
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
        <RoundButton
          icon={searchIcon}
          callback={showModal}
          position={{ right: 30 }}
          iconSize={HEIGHT / 15}
        />
      )}
      <Modal transparent={true} visible={isShowModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.modalCenter]}>
          <Pressable
            onPress={() => setIsShowModal(false)}
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
    height: HEIGHT,
  },
  icon: {
    height: HEIGHT / 20,
    width: HEIGHT / 20,
  },
  loading: {
    backgroundColor: color.antiFlashWhite,
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: HEIGHT / 10,
    zIndex: 2,
    width: WIDTH,
    paddingBottom: 10,
    alignItems: 'center',
  },
  modalScreen: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: color.black,
    position: 'absolute',
    opacity: 0.5,
    top: 0,
    left: 0,
  },
  tabBar: {
    height: HEIGHT / 10,
    paddingHorizontal: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addButton: {
    borderRadius: 1000,
    backgroundColor: color.violetBlue,
    height: HEIGHT / 15,
    width: HEIGHT / 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    color: color.white,
    fontSize: HEIGHT / 10 - 40 + 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  modal: {
    maxHeight: 50,
    width: '95%',
    backgroundColor: color.white,
    zIndex: 10,
  },
});

export default HomeNavigator;
