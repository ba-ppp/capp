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
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const Stack = createStackNavigator();

const App = () => {
  const [displayStartScreen, setDisplayStartScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplayStartScreen(false);
    }, 1500);
  }, []);

  return (
    <Provider store={store}>
      {displayStartScreen && <StartScreen />}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
          <Stack.Screen name="Camera" component={MyCamera} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
