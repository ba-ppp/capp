import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LanguageModal from '../../components/LanguageModal';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

const EmptyScreenComponent = () => {
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

const HomeNavigator = ({ navigation }) => {
  const styles = StyleSheet.create({
    tabBar: {
      height: 40,
      paddingHorizontal: 40,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  });
  const homeIcon = require('../../../assets/home_icon.png');
  const cameraIcon = require('../../../assets/camera_icon.png');
  const screenOptions = ({ route }) => ({
    tabBarStyle: styles.tabBar,
    tabBarIcon: () => {
      let iconSize = 30;
      if (route.name === 'Home') {
        return (
          <Image
            style={{ width: iconSize, height: iconSize }}
            source={homeIcon}
          />
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

export default HomeNavigator;
