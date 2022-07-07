/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/views/Home/Home';
import Camera from './src/views/Camera/Camera';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let iconSize = 30;
            if (route.name === 'Home') {
              return (
                <Image
                  style={{width: iconSize, height: iconSize}}
                  source={require('./assets/home_icon.png')}
                />
              );
            } else if (route.name === 'Camera') {
              return (
                <Image
                  style={{width: iconSize, height: iconSize}}
                  source={require('./assets/camera_icon.png')}
                />
              );
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Camera" component={Camera} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
