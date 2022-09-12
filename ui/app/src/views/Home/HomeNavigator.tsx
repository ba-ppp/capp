import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet/lib/typescript/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import LanguageModal from '../../components/LanguageModal';
import { color } from '../../constants/constants';
import { addImage } from '../../redux/imageSlice';
import { store } from '../../redux/store';
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
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default HomeNavigator;
