/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './src/views/Home/HomeNavigator';
import MyCamera from './src/views/Camera/Camera';
import StartScreen from './src/components/StartScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const EmptyScreenComponent = () => {
  return null;
};

const App = () => {
  const [displayStartScreen, setDisplayStartScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplayStartScreen(false);
    }, 1500);
  }, []);

  if (displayStartScreen) {
    return <StartScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
        <Stack.Screen name="Camera" component={MyCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
