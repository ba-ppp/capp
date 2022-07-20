import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={require('../../assets/Index.png')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    margin: 25,
    resizeMode: 'cover',
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default StartScreen;
