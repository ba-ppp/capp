import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { color } from '../constants/constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const RoundButton = ({ icon, callback, position, iconSize }) => {
  //style
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: color.roundBtn,
      height: 60,
      width: 60,
      position: 'absolute',
      bottom: windowHeight / 10 + 50,
      zIndex: 5,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      ...position,
    },
    icon: {
      height: iconSize,
      width: iconSize,
    },
  });
  //render
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={callback}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default RoundButton;
